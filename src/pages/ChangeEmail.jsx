import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonLoading,
  IonLabel,
  IonItem,
} from "@ionic/react";

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "../toast";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { errors } from "../utils/Utils";

function ChangeEmail() {
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { reAuthenticate, updateUserEmail, currentUser } = useAuth();

  async function changeEmail() {
    setBusy(true);
    try {
      await reAuthenticate(password);
      await updateUserEmail(email);
      toast("Email changed successfully");
    } catch (e) {
      toast(errors(e));
    }
    setBusy(false);
  }

  if (currentUser === null) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
          <div className="form-heading">
            <h1>CHANGE EMAIL</h1>
          </div>
          <div className="form-input-placement">
            <IonItem lines="none" className="form-border">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                onIonChange={(e) => setPassword(e.target.value)}
              />
            </IonItem>
            <IonItem lines="none" className="form-border">
              <IonLabel position="floating">New Email</IonLabel>
              <IonInput
                type="email"
                onIonChange={(e) => setEmail(e.target.value)}
              />
            </IonItem>
          </div>
          <div className="form-button-placement">
            <IonButton class="form-button" onClick={changeEmail}>
              CHANGE
            </IonButton>
            <div>
              Go back to <Link to="/settings">Settings</Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ChangeEmail;
