import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "../toast";
import { registerUser } from "../firebase";
import './Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [busy, setBusy] = useState<boolean>(false);

  async function register() {
    // validation
    setBusy(true);
    if (password !== cpassword) {
      return toast("Passwords do not match");
    }
    if (username.trim() === "" || password.trim() === "") {
      return toast("Username and password are required");
    }

    const res = await registerUser(username, password);
    if (res) {
      toast("You have registered successfully");
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding">
          <IonItem lines="none" className="form-border">
          <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              onIonChange={(e: any) => setUsername(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
          <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
          <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e: any) => setCPassword(e.target.value)}
            />
          </IonItem>
          <IonButton onClick={register}>Register</IonButton>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
