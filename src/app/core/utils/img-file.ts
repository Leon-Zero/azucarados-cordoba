export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Formato no permitido. Solo JPG, PNG, WEBP o SVG.';
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return 'La imagen supera el peso máximo de 5 MB.';
  }

  return null;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject('Error leyendo el archivo');
    reader.readAsDataURL(file);
  });
}
