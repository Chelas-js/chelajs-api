import admin from "firebase-admin";

if (!process.env.FIREBASE_CREDENTIALS)
  throw new Error("FIREBASE_CREDENTIALS is not set");
const firebaseCredentials = JSON.parse(atob(process.env.FIREBASE_CREDENTIALS!));
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

export const configuration = async () => {
  return {
    port: Number(process.env.PORT ?? 3000),
    databaseId: process.env.DATABASE_ID ?? "chelajs",
    firebaseApp,
  };
};
