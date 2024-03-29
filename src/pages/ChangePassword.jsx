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
// import { setUserState } from "../redux/actions";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { errors } from "../utils/Utils";

function ChangePassword () {
	const [busy, setBusy] = useState(false);
	const [oldPassword, setOldPassword] = useState("");
	const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {reAuthenticate, updateUserPassword, currentUser} = useAuth();


	async function changePassword() {
		setBusy(true);
    if (password !== confirmPassword) {
      toast("Passwords do not match")
      return;
    }

    try {
      await reAuthenticate(oldPassword);
      await updateUserPassword(password);
      toast("Password Reset Succesfully")
    } catch (e) {
      toast (errors(e))
    }
		setBusy(false);
	}

  if (currentUser === null) {
    return (<Redirect to="/login"/>)
  }

	return (
		<IonPage>
      <IonContent className="ion-padding">
      <FormTopBar/>
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
        <div className="form-heading">
            <h1>CHANGE PASSWORD</h1>
          </div>
          <div className="form-input-placement">
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setOldPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">New Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Confirm New Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setConfirmPassword(e.target.value)}
            />
          </IonItem>
          </div>
          <div className="form-button-placement">
            <IonButton class="form-button" onClick={changePassword}>
              RESET
            </IonButton>
            <div>
              Go back to <Link to="/settings">Settings</Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
	);
};

export default ChangePassword;