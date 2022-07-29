import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
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

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const storage = getStorage();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function emailVerification() {
    return sendEmailVerification(auth.currentUser);
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function deActivate() {
    return deleteUser(auth.currentUser);
  }

  function deleteTotalData() {
    deleteConnectionData();
    deleteContactData();
    deleteSocialData();
    deleteMusicData();
    deletePaymentData();
    deleteWorkData();
    deleteUserData();
    deleteBannerPicture();
    deleteProfilePicture();
    deleteContactCard();
  }

  function deleteBannerPicture() {
    return deleteObject(ref(storage, "banner/" + currentUser.uid));
  }

  function deleteProfilePicture() {
    return deleteObject(ref(storage, "profile/" + currentUser.uid));
  }

  function deleteContactCard() {
    return deleteObject(ref(storage, "contact/" + currentUser.uid + ".vcf"));
  }

  function deleteConnectionData() {
    return deleteDoc(doc(db, "connection", currentUser.uid));
  }

  function deleteContactData() {
    return deleteDoc(doc(db, "contact", currentUser.uid));
  }

  function deleteMusicData() {
    return deleteDoc(doc(db, "music", currentUser.uid));
  }

  function deletePaymentData() {
    return deleteDoc(doc(db, "payment", currentUser.uid));
  }

  function deleteSocialData() {
    return deleteDoc(doc(db, "social", currentUser.uid));
  }

  async function deleteUserData() {
    await deleteDoc(doc(db, "user", currentUser.uid));
    return;
  }

  function deleteWorkData() {
    return deleteDoc(doc(db, "work", currentUser.uid));
  }

  function reAuthenticate(password) {
    const credentials = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    return reauthenticateWithCredential(auth.currentUser, credentials);
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    emailVerification,
    updateUserEmail,
    updateUserPassword,
    reAuthenticate,
    deActivate,
    deleteTotalData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
