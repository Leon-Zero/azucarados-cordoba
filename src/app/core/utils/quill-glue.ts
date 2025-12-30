import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from './firebase-storage';

// Base64 a Firebase Storage
async function uploadBase64(base64: string, slug: string): Promise<string> {
  const storage = firebaseStorage;

  const match = base64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.*)$/);
  if (!match) {
    throw new Error('Formato base64 inválido');
  }

  const mimeType = match[1];
  const extension = mimeType.split('/')[1] ?? 'png';

  const fileName = `blogs/${slug}/${crypto.randomUUID()}.${extension}`;
  const storageRef = ref(storage, fileName);

  await uploadString(storageRef, base64, 'data_url', {
    contentType: mimeType,
  });

  return await getDownloadURL(storageRef);
}

// imagenes base64

async function processImages(doc: Document, slug: string): Promise<void> {
  const images = Array.from(doc.querySelectorAll('img'));

  for (const img of images) {
    const src = img.getAttribute('src') ?? '';
    if (!src.startsWith('data:image/')) continue;

    try {
      const url = await uploadBase64(src, slug);
      img.setAttribute('src', url);
      img.removeAttribute('data-src');
    } catch (err) {
      console.error('Error subiendo imagen a Firebase', err);
    }
  }
}

// Iframe para yotube

function parseYouTube(urlStr: string): { id: string | null; qs: string } {
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

function processYouTubeEmbeds(doc: Document): void {
  const anchors = Array.from(doc.querySelectorAll('a'));

  anchors.forEach((a) => {
    const href = a.getAttribute('href') ?? a.textContent ?? '';
    if (!/youtube\.com|youtu\.be/i.test(href)) return;

    const { id, qs } = parseYouTube(href.trim());
    if (!id) return;

    const src = `https://www.youtube.com/embed/${encodeURIComponent(id)}${qs ? '?' + qs : ''}`;

    const iframe = doc.createElement('iframe');
    iframe.style.cssText = 'width:100%;height:100%;border:0;position:absolute;top:0;left:0;';
    iframe.setAttribute('src', src);
    iframe.setAttribute('allowfullscreen', '');

    const wrapper = doc.createElement('div');
    wrapper.className = 'quill-video-wrapper';
    wrapper.style.cssText =
      'position:relative;aspect-ratio:16/9;overflow:hidden;max-width:600px;margin:1rem auto;';
    wrapper.appendChild(iframe);

    a.replaceWith(wrapper);
  });
}

// salto de linea <p>

function isTrulyEmptyP(p: Element): boolean {
  if (p.tagName !== 'P') return false;
  if (p.querySelector('img')) return false;

  const innerHtml = (p.innerHTML || '').replace(/&nbsp;|\u00A0|\u200B/g, '').trim();
  const text = (p.textContent || '').replace(/\u00A0|\u200B/g, '').trim();

  return (innerHtml === '' || innerHtml.toLowerCase() === '<br>') && text === '';
}

function processParagraphSpacing(doc: Document): void {
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

  for (let i = 0; i < bodyChildren.length; i++) {
    const node = bodyChildren[i];

    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === 'P') {
      const pEl = node as Element;
      if (isTrulyEmptyP(pEl)) {
        buffer.push(pEl);
        continue;
      } else {
        if (buffer.length > 0) {
          buffer.forEach((el) => el.remove());
          insertReplacementBefore(node, buffer.length);
          buffer.length = 0;
        }
        continue;
      }
    } else {
      if (buffer.length > 0) {
        buffer.forEach((el) => el.remove());
        insertReplacementBefore(node, buffer.length);
        buffer.length = 0;
      }
    }
  }

  if (buffer.length > 0) {
    buffer.forEach((el) => el.remove());
    insertReplacementBefore(null, buffer.length);
  }
}

// parseo de html

export async function transformQuillHtml(quillHtml: string, slug: string): Promise<string> {
  if (!quillHtml) return '';

  if (typeof DOMParser === 'undefined') {
    return quillHtml;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(quillHtml, 'text/html');

  await processImages(doc, slug);
  processYouTubeEmbeds(doc);
  processParagraphSpacing(doc);

  return doc.body.innerHTML;
}
