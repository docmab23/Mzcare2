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
import { loginUser, reAuthenticate, updateUserPassword } from "../firebase";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";

const ChangePassword: React.FC = () => {
	const [busy, setBusy] = useState<boolean>(false);
	const history = useHistory();
	// const dispatch = useDispatch();
	const [oldPassword, setOldPassword] = useState("");
	const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    } catch {
      toast("error")
    }
		// const res: any = await loginUser(username, password);
		setBusy(false);
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
              onIonChange={(e: any) => setOldPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">New Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e: any) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Confirm New Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e: any) => setConfirmPassword(e.target.value)}
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