import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { createSlice } from '@reduxjs/toolkit'
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";
import firebase from "firebase/app";
import { doc, updateDoc, getDoc } from "firebase/firestore";
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
import { useDispatch } from "react-redux";

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

// export function getCurrentUser() {
//   return auth.currentUser;
// }

// export async function GetImmunizations() {
//   const user = auth.currentUser
//   console.log(user)
//   const immunizationDataRef = doc(db,  auth.currentUser?.uid + "/immunization")
//   console.log(auth.currentUser?.uid)
//   const vaccines = [];
//   await getDoc(immunizationDataRef).then((docSnap) => {
//     if (docSnap.exists()) {
//       const immunizationData = docSnap.data();
//       for (let key in immunizationData) {
//         vaccines.push(immunizationData[key])
//       }
//       console.log(vaccines)
//       return "ok";
//     // } else {
//       return "pk";
//     }
//   })
//   return "l";
// }

// export const ok = GetImmunizations();

// export function logoutUser() {
//   return auth.signOut();
// }

// export async function reAuthenticate(password) {
//   try {
// 	const user = auth.currentUser  
//     const credentials = EmailAuthProvider.credential(user.email  , password);
//     return reauthenticateWithCredential(auth.currentUser  , credentials);
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// export async function loginUser(email, password ) {
//   try {
//     const res = signInWithEmailAndPassword(auth, email, password);
//     return res;
//   } catch (error) {
//     // 	toast(error.message, 4000);
//     // console.log(error as Error);
//     var arr_mes = (error).message;
//     console.log(arr_mes);
//     if (arr_mes === "Firebase: Error (auth/wrong-password).") {
//       console.log("hello");
//       toast("Wrong password",4000);

//     }

//     return false;
//   }
// }

// export async function resetPassword(email) {
//     return sendPasswordResetEmail(auth, email);
//   }

// export async function updateUserEmail(email) {
//   return updateEmail(auth.currentUser  , email);
// }

// export async function emailVerification() {
//   return sendEmailVerification(auth.currentUser  );
// }

// export async function updateUserPassword(password) {
//   return updatePassword(auth.currentUser  , password);
// }

// export async function registerUser(email, password ) {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);

//     return res;
//   } catch (error) {
//     // toast(error.message, 4000);
//     var arr_mes = (error).message;
//     // console.log(arr_mes);
//     if (arr_mes === "Firebase: Error (auth/email-already-in-use).") {
//       console.log("hello");
//       toast("Email already exists",4000);

//     }
//     return false;
//   }
// }