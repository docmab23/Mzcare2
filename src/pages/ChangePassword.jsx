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
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { errors } from "../utils/Utils";

function ChangePassword () {
	const [busy, setBusy] = useState(false);
	const history = useHistory();
	// const dispatch = useDispatch();
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
        <IonText >
          <h2>
          CHANGE PASSWORD
            </h2></IonText>
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
          <div className="padding-lign">
            <IonButton class="form-button" onClick={changePassword}>
              Change Password
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
	);
};

export default ChangePassword;