import React, { useContext , useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonItem, IonLabel, IonInput , IonCheckbox , IonButton } from '@ionic/react';
import './Tab1.css';
import {auth} from "../firebase" ;
import { useHistory } from 'react-router';
// import {signup} from "../contexts/AuthContext"
import {createUserWithEmailAndPassword} from "firebase/auth";

const Signup: React.FC = () => {
// Import the signup function we defined in AuthContext.js
  // const user = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
        
      );
      console.log("created fucker");
    } catch (error) {
      console.log("Fuckkkkkkkkkkkkkkkkkkkk");
      console.error(error);
    }
  };

  

  
  return (
    <form className="ion-padding">
  <IonItem>
    <IonLabel position="floating">Username</IonLabel>
    <IonInput />
  </IonItem>
  <IonItem>
    <IonLabel position="floating">Password</IonLabel>
    <IonInput type="password" />
  </IonItem>
  <IonItem lines="none">
    <IonLabel>Remember me</IonLabel>
    <IonCheckbox defaultChecked={true} slot="start" />
  </IonItem>
  <IonButton className="ion-margin-top" type="submit" expand="block" onClick={createAccount}>
    Signup
  </IonButton>
</form>
  )
}

export default Signup;
