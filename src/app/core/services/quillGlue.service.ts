import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuillGlueService {
  constructor(private http: HttpClient) {}

  async uploadBase64(base64: string, slug: string): Promise<string> {
    const match = base64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.*)$/);
    if (!match) throw new Error('Formato base64 inválido');

    const token = localStorage.getItem('token');
    if (!token) throw new Error('Sesión expirada. Inicia sesión nuevamente.');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.roles || payload.authorities || payload.role || payload.authority;
      const isAdmin = Array.isArray(roles)
        ? roles.includes('ROLE_ADMIN')
        : typeof roles === 'string' && roles.includes('ROLE_ADMIN');
      if (!isAdmin) throw new Error('Necesitas permisos de administrador para subir imágenes.');
    } catch {}

    const body = { base64, folder: slug };

    try {
      const res = await firstValueFrom(
        this.http.post<{ url: string }>(`${environment.urlBack}/api/storage/upload`, body),
      );
      return res.url;
    } catch (err: any) {
      if (err?.status === 401) {
        throw new Error('Sesión expirada o token inválido. Inicia sesión nuevamente.');
      } else if (err?.status === 403) {
        throw new Error('Sin permisos (ROLE_ADMIN) para subir imágenes.');
      } else {
        throw new Error('Error subiendo imagen al backend.');
      }
    }
  }

  private parseYouTube(urlStr: string): { id: string | null; qs: string } {
    try {
      const url = new URL(urlStr);

      let id: string | null = null;

      if (url.hostname.includes('youtu.be')) {
        id = url.pathname.split('/').filter(Boolean)[0] ?? null;
      } else if (url.hostname.includes('youtube.com')) {
        if (url.pathname.startsWith('/watch')) {
          id = url.searchParams.get('v');
        } else if (url.pathname.startsWith('/embed/')) {
          id = url.pathname.split('/embed/')[1]?.split('/')[0] ?? null;
        } else {
          id = url.searchParams.get('v');
        }
      }

      const keep = ['start', 't', 'autoplay', 'rel', 'controls', 'mute', 'showinfo'];
      const qs = Array.from(url.searchParams.entries())
        .filter(([k]) => k !== 'v' && keep.includes(k))
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');

      return { id, qs };
    } catch {
      return { id: null, qs: '' };
    }
  }

  private createYouTubeIframe(id: string, qs: string): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}${qs ? '?' + qs : ''}`;
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'width:100%;height:100%;border:0;position:absolute;top:0;left:0;';
    return iframe;
  }

  private wrapIframe(iframe: HTMLIFrameElement): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'quill-video-wrapper';
    wrapper.style.cssText =
      'position:relative;aspect-ratio:16/9;overflow:hidden;max-width:600px;margin:1rem auto;';
    wrapper.appendChild(iframe);
    return wrapper;
  }

  processYouTubeEmbeds(doc: Document): void {
    doc.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href') ?? '';
      if (!/youtube\.com|youtu\.be/.test(href)) return;

      const { id, qs } = this.parseYouTube(href);
      if (!id) return;

      a.replaceWith(this.wrapIframe(this.createYouTubeIframe(id, qs)));
    });
  }

  /* --------------------------------------------- */
  /* SALTOS DE LÍNEA (NORMALIZACIÓN TOTAL) */
  /* --------------------------------------------- */

  private isLineBreakNode(node: Node): boolean {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;

      if (el.tagName === 'BR') return true;
      if (el.querySelector('img, iframe, video')) return false;

      const html = (el.innerHTML || '')
        .replace(/&nbsp;|\u00A0|\u200B/g, '')
        .replace(/<span[^>]*>|<\/span>/gi, '')
        .replace(/<br\s*\/?>/gi, '')
        .trim();

      const text = (el.textContent || '').replace(/\u00A0|\u200B/g, '').trim();

      return html === '' && text === '';
    }
    return false;
  }

  private processParagraphSpacing(doc: Document): void {
    const nodes = Array.from(doc.body.children);
    let count = 0;

    const insertGap = (before: Element | null, n: number) => {
      const gap = doc.createElement('div');
      gap.className = `quill-gap quill-gap-${n}`;
      gap.style.height = `${n * 0.7}rem`;

      if (before?.parentNode) {
        before.parentNode.insertBefore(gap, before);
      } else {
        doc.body.appendChild(gap);
      }
    };

    for (const node of nodes) {
      if (this.isLineBreakNode(node)) {
        count++;
        node.remove();
        continue;
      }

      if (count > 0) {
        insertGap(node, count);
        count = 0;
      }
    }

    if (count > 0) {
      insertGap(null, count);
    }
  }

  /* --------------------------------------------- */
  /* NORMALIZACIÓN DE ESPACIOS (&nbsp;) EN DOM */
  /* --------------------------------------------- */
  processNbspNormalization(doc: Document): void {
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);

    let node: Text | null;

    while ((node = walker.nextNode() as Text | null)) {
      const value = node.nodeValue;
      if (!value) continue;

      const normalized = value
        // NBSP y variantes unicode
        .replace(/[\u00A0\u2007\u202F]/g, ' ')
        // espacios múltiples → uno solo
        .replace(/ {2,}/g, ' ');

      if (normalized !== value) {
        node.nodeValue = normalized;
      }
    }
  }

  /* --------------------------------------------- */
  /* IMÁGENES */
  /* --------------------------------------------- */

  private async processImages(doc: Document, slug: string): Promise<void> {
    const images = Array.from(doc.querySelectorAll('img'));

    for (const img of images) {
      const src = img.getAttribute('src') ?? '';
      if (!src.startsWith('data:image/')) continue;

      const url = await this.uploadBase64(src, slug);
      img.setAttribute('src', url);
    }
  }

  /* --------------------------------------------- */
  /* TRANSFORM */
  /* --------------------------------------------- */

  async transformQuillHtml(quillHtml: string, slug: string): Promise<string> {
    if (!quillHtml || typeof DOMParser === 'undefined') return quillHtml;

    const doc = new DOMParser().parseFromString(quillHtml, 'text/html');

    await this.processImages(doc, slug);
    this.processYouTubeEmbeds(doc);
    this.processParagraphSpacing(doc);
    this.processNbspNormalization(doc);

    return doc.body.innerHTML;
  }
}
