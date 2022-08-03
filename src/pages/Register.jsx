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
  IonText,
} from "@ionic/react";
import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "../toast";
import { registerUser } from "../firebase";
import "./Register.css";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const {signup} = useAuth();

  async function register() {
    // validation
    setBusy(true);
    try {
      if (password !== cpassword) {
        return toast("Passwords do not match");
      }
      if (username.trim() === "" || password.trim() === "") {
        return toast("Username and password are required");
      }
  
      const res = await signup(username, password);
      if (res) {
        toast("You have registered successfully");
        history.replace("/general");
      }
      
    } catch (e) {
      toast(e);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
      <FormTopBar></FormTopBar>
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
        <IonText >
          <h2>
          SIGN UP
            </h2></IonText>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              onIonChange={(e) => setUsername(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setCPassword(e.target.value)}
            />
          </IonItem>
          <div className="padding-lign">
            <IonButton class="form-button" onClick={register}>
              SIGN UP
            </IonButton>
          </div>
          <span className="padding-lign">
            Already signed up? <Link to="/login">Login</Link>
          </span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
