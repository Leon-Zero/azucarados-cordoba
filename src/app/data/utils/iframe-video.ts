export function transformQuillHtml(quillHtml: string): string {
  if (!quillHtml) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(quillHtml, 'text/html');

  // obtener el id de YouTube
  function parseYouTube(urlStr: string): { id: string | null; qs: string } {
    try {
      const url = urlStr.startsWith('http')
        ? new URL(urlStr)
        : new URL(urlStr, 'https://example.com');
      const hostname = url.hostname.toLowerCase();

      let id: string | null = null;
      // youtu.be/ID
      if (hostname.includes('youtu.be')) {
        id = url.pathname.split('/').filter(Boolean)[0] || null;
      }
      // youtube.com/watch?v=ID
      else if (hostname.includes('youtube.com')) {
        if (url.pathname.startsWith('/watch')) {
          id = url.searchParams.get('v');
        } else if (url.pathname.startsWith('/embed/')) {
          id = url.pathname.split('/embed/')[1]?.split('/')[0] ?? null;
        } else {
          // otros casos, no youtube
          id = url.searchParams.get('v');
        }
      }

      // Construir query string a pasar al embed
      const keep = ['si', 'start', 't', 'autoplay', 'rel', 'controls', 'mute'];
      const qsParts: string[] = [];
      url.searchParams.forEach((value, key) => {
        if (key === 'v') return;
        if (keep.includes(key))
          qsParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      });
      const qs = qsParts.join('&');

      return { id: id ?? null, qs };
    } catch (e) {
      return { id: null, qs: '' };
    }
  }

  // Buscar todos los anchors
  const anchors = Array.from(doc.querySelectorAll('a'));
  anchors.forEach((a) => {
    const href = a.getAttribute('href') ?? a.textContent ?? '';
    if (/youtube\.com|youtu\.be/i.test(href)) {
      const { id, qs } = parseYouTube(href.trim());
      if (id) {
        // Generar iframe
        const src = `https://www.youtube.com/embed/${encodeURIComponent(id)}${qs ? '?' + qs : ''}`;
        const iframe = doc.createElement('iframe');
        iframe.setAttribute('width', '560');
        iframe.setAttribute('height', '315');
        iframe.setAttribute('src', src);
        iframe.setAttribute('title', 'YouTube video player');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        );
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allowfullscreen', '');

        const wrapper = doc.createElement('div');
        wrapper.className = 'quill-video-wrapper';

        wrapper.setAttribute(
          'style',
          'position:relative;aspect-ratio:16/9;overflow:hidden;max-width:600px;margin:1rem auto;'
        );
        iframe.setAttribute(
          'style',
          'width:100%;height:100%;border:0;position:absolute;top:0;left:0;'
        );

        wrapper.appendChild(iframe);
        a.replaceWith(wrapper);
      }
    }
  });

  console.log(doc.body.innerHTML);
  return doc.body.innerHTML;
}
