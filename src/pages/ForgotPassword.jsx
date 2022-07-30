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
  import { resetPassword } from "../firebase";
  import { toast } from "../toast";
  // import { setUserState } from "../redux/actions";
  import { useDispatch } from "react-redux";
  import FormTopBar from "../components/FormTopBar";
  
  function ForgotPassword () {
    const [busy, setBusy] = useState<boolean>(false);
    const history = useHistory();
    // const dispatch = useDispatch();
    const [email, setEmail] = useState("");
  
    async function forgotPassword() {
      setBusy(true);
      try {
       await resetPassword(email);
        toast("Email sent");
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
              <h2>Forgot Password</h2>
            </IonText>
            <IonItem lines="none" className="form-border">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                onIonChange={(e) => setEmail(e.target.value)}
              />
            </IonItem>
            <div className="padding-lign">
              <IonButton class="form-button" onClick={forgotPassword}>
                Send Email
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ForgotPassword;
  