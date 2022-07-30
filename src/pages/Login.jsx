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
import { auth, loginUser } from "../firebase";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import  { changeUser } from "./auth";

function Login() {
	const [busy, setBusy] = useState<boolean>(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		setBusy(true);
		const res = await loginUser(email, password);
		if (res) {
      dispatch(changeUser(auth.currentUser.uid))
			history.replace("/home");
			toast("You have logged in");
		}
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
          SIGN IN
            </h2></IonText>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              onIonChange={(e) => setEmail(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <div className="padding-lign">
            <IonButton class="form-button" onClick={login}>
              SIGN IN
            </IonButton>
          </div>
          <span className="padding-lign">
            New to MzCare? <Link to="/register">Sign Up</Link>
          </span>
        </div>
      </IonContent>
    </IonPage>
	);
};

export default Login;
