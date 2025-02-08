import { db } from "../config/firebaseConfig";
import { User } from "@repo/shared-types";

const usersRef = db.collection("users");

export const fetchUserData = async (
  userId?: string
): Promise<User[] | User | null> => {
  if (userId) {
    const doc = await usersRef.doc(userId).get();
    if (doc.exists) {
      return {
        ...(doc.data() as User),
        id: doc.id, // Add the document ID
      };
    }
    return null;
  }

  const docs = await usersRef.get();
  return docs.docs.map((doc) => ({
    ...(doc.data() as User),
    id: doc.id, // Add the document ID for each user
  }));
};

export const updateUserData = async (userId: string, data: Partial<User>) => {
  const user = await fetchUserData(userId);
  if (!user) {
    await usersRef.add(data);
    return;
  }

  await usersRef.doc(userId).update(data);
};

export const deleteUserData = async (userId: string) => {
  await usersRef.doc(userId).delete();
};
