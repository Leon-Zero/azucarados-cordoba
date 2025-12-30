import { ref, listAll, deleteObject } from 'firebase/storage';
import { firebaseStorage } from './firebase-storage';

export async function deleteBlogFolder(slug: string): Promise<void> {
  const storage = firebaseStorage;
  const folderRef = ref(storage, `blogs/${slug}`);

  const result = await listAll(folderRef);

  const deletions = result.items.map((itemRef) =>
    deleteObject(itemRef)
  );

  await Promise.all(deletions);
}
