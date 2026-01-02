import { ref, listAll, deleteObject } from 'firebase/storage';
import { firebaseStorage } from './firebase-storage';

export async function deleteBlogFolder(slug: string): Promise<void> {
  const storage = firebaseStorage;
  const folderRef = ref(storage, `blogs/${slug}`);
  const result = await listAll(folderRef);
  const deletions = result.items.map((itemRef) => deleteObject(itemRef));
  
  await Promise.all(deletions);
}

export async function deleteFileByUrl(url: string): Promise<void> {
  try {
    const fileRef = ref(firebaseStorage, url);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn('No se pudo eliminar la imagen anterior', err);
  }
}

export async function deleteDestacadoFolder(id: number): Promise<void> {
  const storage = firebaseStorage;
  const folderRef = ref(storage, `destacados/${id}`);

  const result = await listAll(folderRef);
  const deletions = result.items.map(item => deleteObject(item));

  await Promise.all(deletions);
}