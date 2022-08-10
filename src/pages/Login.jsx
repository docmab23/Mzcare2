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
  useIonViewDidEnter,
} from "@ionic/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
import { errors, hideTabBar } from "../utils/Utils";

function Login() {
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { genList } = useDatabase();

  useIonViewDidEnter(() => {
    hideTabBar();
  });

  async function loginUser() {
    setBusy(true);
    try {
      const res = await login(email, password);
      if (res) {
        if (auth.currentUser.emailVerified) {
          if (genList.length == 0) {
            history.replace("/general");
          } else {
            history.replace("/home");
          }
          toast("You have logged in");
        } else {
          toast("Email not verified, check your Spam!");
        }
      } else {
        toast("Not able to login");
      }
    } catch (e) {
      toast(errors(e));
      console.log(e);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <IonLoading message="Signing in..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
          <div className="form-heading">
            <h1>SIGN IN</h1>
          </div>
          <div className="form-input-placement">
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
          </div>
          <div className="form-button-placement">
            <IonButton class="form-button" onClick={loginUser}>
              SIGN IN
            </IonButton>
            <div>
              New to MzCare? <Link to="/register">Sign Up</Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
