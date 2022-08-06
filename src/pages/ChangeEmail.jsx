import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonText,
  IonLabel,
  IonItem,
} from "@ionic/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { errors } from "../utils/Utils";


function ChangeEmail ()  {
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {reAuthenticate, updateUserEmail} = useAuth();

  async function changeEmail() {
    setBusy(true);
    try {
      await reAuthenticate(password);
      await updateUserEmail(email);
      toast("Email changed successfully");
    } catch(e) {
      toast (errors(e))
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
          <IonText>
            <h2>CHANGE EMAIL</h2>
          </IonText>
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
          <div className="padding-lign">
            <IonButton class="form-button" onClick={changeEmail}>
              Change Email
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChangeEmail;
