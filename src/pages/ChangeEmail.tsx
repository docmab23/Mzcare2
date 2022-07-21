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
import { loginUser, reAuthenticate, updateUserEmail } from "../firebase";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";

const ChangeEmail: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function changeEmail() {
    setBusy(true);
    try {
      await reAuthenticate(password);
      await updateUserEmail(email);
      toast("Email changed successfully");
    } catch {
      toast("error");
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
              onIonChange={(e: any) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">New Email</IonLabel>
            <IonInput
              type="email"
              onIonChange={(e: any) => setEmail(e.target.value)}
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
