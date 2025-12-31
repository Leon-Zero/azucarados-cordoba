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
  const storage = firebaseStorage;

  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn('No se pudo eliminar la imagen anterior', err);
  }
}
