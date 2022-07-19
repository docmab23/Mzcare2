import React, { useContext , useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput , IonButton} from '@ionic/react';
import './Tab1.css';
import { useAuth } from '../contexts/AuthContext';
import {createUserWithEmailAndPassword} from "firebase/auth";
const Login: React.FC = () => {

    const [userame , setusername] = useState("");
    const [password , setPassword] = useState("");


  return (
    <IonPage>
     <h1 color="red">Hello</h1>
     <IonButton onClick={(e) => console.log(e)}>Click me </IonButton>
     <IonInput onIonChange={(e) => console.log(e)}> Input </IonInput>
    </IonPage>
  );
};

export default Login;
