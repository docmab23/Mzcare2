import React, { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase";
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
import { userInfo } from "os";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProps = {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const storage = getStorage();

  function signup(email: any, password: any) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: any, password: any) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function emailVerification() {
    return sendEmailVerification(auth.currentUser!);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: any) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: any) {
    return updateEmail(auth.currentUser!, email);
  }

  function deActivate() {
    return deleteUser(auth.currentUser!);
  }

  function reAuthenticate(password: any, email: any) {
    const credentials = EmailAuthProvider.credential(
      email,
      password
    );
    return reauthenticateWithCredential(auth.currentUser!, credentials);
  }

  function updateUserPassword(password: any) {
    return updatePassword(auth.currentUser!, password);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    emailVerification,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );


}