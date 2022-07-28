import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";
import firebase from "firebase/app";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "./toast";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
}

export function logoutUser() {
  return auth.signOut();
}

export async function reAuthenticate(password: string) {
  try {
	const user = auth.currentUser!
    const credentials = EmailAuthProvider.credential(user.email!, password);
    return reauthenticateWithCredential(auth.currentUser!, credentials);
  } catch (error) {
    console.log(error as Error);
    return false;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    // 	toast(error.message, 4000);
    // console.log(error as Error);
    var arr_mes = (error as Error).message;
    console.log(arr_mes);
    if (arr_mes === "Firebase: Error (auth/wrong-password).") {
      console.log("hello");
      toast("Wrong password",4000);

    }

    return false;
  }
}

export async function resetPassword(email: any) {
    return sendPasswordResetEmail(auth, email);
  }

export async function updateUserEmail(email: any) {
  return updateEmail(auth.currentUser!, email);
}

export async function emailVerification() {
  return sendEmailVerification(auth.currentUser!);
}

export async function updateUserPassword(password: any) {
  return updatePassword(auth.currentUser!, password);
}

export async function registerUser(email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    return res;
  } catch (error) {
    // toast(error.message, 4000);
    var arr_mes = (error as Error).message;
    // console.log(arr_mes);
    if (arr_mes === "Firebase: Error (auth/email-already-in-use).") {
      console.log("hello");
      toast("Email already exists",4000);

    }
    return false;
  }
}

export async function setImmunization(data: any) {
  const immunizationRef = doc(db, auth.currentUser?.uid + "/immunization")
  setDoc(immunizationRef, data)
}

export async function setMedication(data: any) {
  const medicationRef = doc(db, auth.currentUser?.uid + "/medication")
  setDoc(medicationRef, data)
}

export async function setICE(data: any) {
  const iceRef = doc(db, auth.currentUser?.uid + "/ice")
  setDoc(iceRef, data)
}

export async function setAllergy(data: any) {
  const allergyRef = doc(db, auth.currentUser?.uid + "/allergy")
  setDoc(allergyRef, data)
}
