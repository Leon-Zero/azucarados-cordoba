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
        this.http.post<{ url: string }>(`${environment.urlBack}/api/storage/upload`, body)
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
      const url = urlStr.startsWith('http')
        ? new URL(urlStr)
        : new URL(urlStr, 'https://example.com');

      const host = url.hostname.toLowerCase();
      let id: string | null = null;

      if (host.includes('youtu.be')) {
        id = url.pathname.split('/').filter(Boolean)[0] ?? null;
      } else if (host.includes('youtube.com')) {
        if (url.pathname.startsWith('/watch')) {
          id = url.searchParams.get('v');
        } else if (url.pathname.startsWith('/embed/')) {
          id = url.pathname.split('/embed/')[1]?.split('/')[0] ?? null;
        } else {
          id = url.searchParams.get('v');
        }
      }

      const keep = ['si', 'start', 't', 'autoplay', 'rel', 'controls', 'mute'];
      const qs = Array.from(url.searchParams.entries())
        .filter(([k]) => k !== 'v' && keep.includes(k))
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');

      return { id, qs };
    } catch {
      return { id: null, qs: '' };
    }
  }

  private processYouTubeEmbeds(doc: Document): void {
    const anchors = Array.from(doc.querySelectorAll('a'));
    anchors.forEach((a) => {
      const href = a.getAttribute('href') ?? a.textContent ?? '';
      if (!/youtube\.com|youtu\.be/i.test(href)) return;

      const { id, qs } = this.parseYouTube(href.trim());
      if (!id) return;

      const iframe = this.createYouTubeIframe(id, qs);
      const wrapper = this.wrapIframe(iframe);

      a.replaceWith(wrapper);
    });

    const iframes = Array.from(doc.querySelectorAll('iframe'));

    iframes.forEach((iframe) => {
      const src = iframe.getAttribute('src') ?? '';
      if (!/youtube\.com\/embed\//i.test(src)) return;
      if (iframe.closest('.quill-video-wrapper')) return;

      iframe.removeAttribute('width');
      iframe.removeAttribute('height');
      iframe.style.cssText = 'width:100%;height:100%;border:0;position:absolute;top:0;left:0;';

      const wrapper = this.wrapIframe(iframe);
      iframe.replaceWith(wrapper);
    });
  }

  private createYouTubeIframe(id: string, qs: string): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.setAttribute(
      'src',
      `https://www.youtube.com/embed/${encodeURIComponent(id)}${qs ? '?' + qs : ''}`
    );
    iframe.setAttribute('allowfullscreen', '');
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

  private isTrulyEmptyP(p: Element): boolean {
    if (p.tagName !== 'P') return false;
    if (p.querySelector('img')) return false;

    const innerHtml = (p.innerHTML || '').replace(/&nbsp;|\u00A0|\u200B/g, '').trim();

    const text = (p.textContent || '').replace(/\u00A0|\u200B/g, '').trim();

    return (innerHtml === '' || innerHtml.toLowerCase() === '<br>') && text === '';
  }

  private processParagraphSpacing(doc: Document): void {
    const bodyChildren = Array.from(doc.body.childNodes);
    const buffer: Element[] = [];

    function insertReplacementBefore(referenceNode: Node | null, count: number) {
      let repl: Node;

      if (count === 1) {
        repl = doc.createElement('br');
      } else if (count === 2) {
        const d = doc.createElement('div');
        d.innerHTML = '<br><br>';
        repl = d;
      } else {
        const d = doc.createElement('div');
        d.className = `quill-gap quill-gap-${count}`;
        d.style.height = `${count * 0.7}rem`;
        repl = d;
      }

      if (referenceNode && referenceNode.parentNode) {
        referenceNode.parentNode.insertBefore(repl, referenceNode);
      } else {
        doc.body.appendChild(repl);
      }
    }

    for (const node of bodyChildren) {
      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'P') {
        const pEl = node as Element;
        if (this.isTrulyEmptyP(pEl)) {
          buffer.push(pEl);
          continue;
        }
      }

      if (buffer.length > 0) {
        buffer.forEach((el) => el.remove());
        insertReplacementBefore(node, buffer.length);
        buffer.length = 0;
      }
    }

    if (buffer.length > 0) {
      buffer.forEach((el) => el.remove());
      insertReplacementBefore(null, buffer.length);
    }
  }

  private async processImages(doc: Document, slug: string): Promise<void> {
    const images = Array.from(doc.querySelectorAll('img'));

    for (const img of images) {
      const src = img.getAttribute('src') ?? '';
      if (!src.startsWith('data:image/')) continue;

      try {
        const url = await this.uploadBase64(src, slug);
        img.setAttribute('src', url);
        img.removeAttribute('data-src');
      } catch (err) {
        console.error('Error subiendo imagen al backend', err);
      }
    }
  }

  async transformQuillHtml(quillHtml: string, slug: string): Promise<string> {
    if (!quillHtml) return '';

    if (typeof DOMParser === 'undefined') {
      return quillHtml;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(quillHtml, 'text/html');

    await this.processImages(doc, slug);
    this.processYouTubeEmbeds(doc);
    this.processParagraphSpacing(doc);

    return doc.body.innerHTML;
  }
}
