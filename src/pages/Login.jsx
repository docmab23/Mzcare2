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

import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "../toast";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
import { errors, hideTabBar } from "../utils/Utils";
import { doc, setDoc } from "firebase/firestore";
import { setUserState } from "../redux/actions";
import ForgotPassword from "../modals/ForgotPassword";
import { sendSignInLinkToEmail } from "firebase/auth";


function Login() {
  const [busy, setBusy] = useState(false);
  const location = useLocation();
  const [card_id, setCardId] = useState(location.state !== null && location.state !== undefined ? location.state.card_id : "")
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, resetPassword } = useAuth();
  const { genList } = useDatabase();
  const [status , setStatus] = useState(false);
  const [emailForgot , setEmailForgot] = useState();
  const controller = new AbortController()


  function changestatus() {

    setStatus(!status)
  }


  function sendEmail(){
    resetPassword(emailForgot, auth);
    setStatus(false);
  }
  

  async function updateDatabase(state, card_uid, user_uid) {
    console.log(card_id)
    console.log(card_uid)
    const cardRef = doc(db, "qrCode/" + card_uid);
    const cardObject = {};
    cardObject["state"] = state;
    cardObject["user_uid"] = user_uid;
    setDoc(cardRef, cardObject);
  }

  useIonViewDidEnter(() => {
    hideTabBar();
  });

  async function loginUser() {
    setBusy(true);
    try {
      const res = await login(email, password);
      if (res) {
        if (auth.currentUser.emailVerified) {
          if (card_id !== "" && card_id !== undefined) {
            await updateDatabase(true, card_id, auth.currentUser.uid);
          }
          if (genList.length == 0) {
            history.push("/general");
          } else {
            history.push("/home");
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

  useEffect(() => {
    return () => {
      controller.abort()
    }
  },[])

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
            <a onClick={changestatus}><u>Forgot Password</u></a>
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
        <ForgotPassword show={status} sendmail={sendEmail} setEmailforgot={setEmailForgot}  changestatus={changestatus}/>

      </IonContent>
    </IonPage>
  );
}

export default Login;
