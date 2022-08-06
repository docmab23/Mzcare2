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
  IonFooter,
} from "@ionic/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, loginUser } from "../firebase";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import  { changeUser } from "./auth";
import { useAuth } from "../contexts/AuthContext";
import {useDatabase} from "../contexts/DatabaseContext";
import { compose } from "@reduxjs/toolkit";
function Login() {
	const [busy, setBusy] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const { login } = useAuth();
  const {genList} = useDatabase();
  

	async function loginUser() {
    setBusy(true);
    try {
      const res = await login(email, password);
		if (res) {
      if (auth.currentUser.emailVerified){
      dispatch(changeUser(auth.currentUser.uid))
      if (genList.length==0){
        history.replace("/general");
      }
      else{
			history.replace("/home");}
			toast("You have logged in");
		}
    else{
      toast("Email not verified, check your Spam!");
    }
  }
    else{
      toast("Not able to login");
    }
    } catch (e) {
      if (e.code=="auth/wrong-password"){
        toast('Wrong password!');
      }
      else if (e.code=="auth/user-not-found"){
        toast("This Email ID has not been registered with MzCare");
      }
      else{
      toast (e);}
      console.log(e);
      
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
            <IonButton class="form-button" onClick={loginUser}>
              SIGN IN
            </IonButton>
          </div>
          <span className="padding-lign">
            New to MzCare? <Link to="/register">Sign Up</Link>
          </span>
        </div>
      </IonContent>
      <IonFooter>
      <h1>{"\u00a0\u00a0\u00a0"} </h1>
      {"\u00a0\u00a0\u00a0"}
      {"\u00a0\u00a0\u00a0"}
      </IonFooter>
    </IonPage>
	);
};

export default Login;
