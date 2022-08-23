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
import { Link, useHistory } from "react-router-dom";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { errors } from "../utils/Utils";

function ForgotPassword() {
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  // const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  async function forgotPassword() {
    setBusy(true);
    try {
      await resetPassword(email);
      toast("Email sent");
    } catch (e) {
      toast(errors(e));
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <IonLoading message="Sending Email.." duration={0} isOpen={busy} />
        <div className="ion-padding container">
          <div className="form-heading">
            <h1>FORGOT PASSWORD</h1>
          </div>
          <div className="form-input-placement">
            <IonItem lines="none" className="form-border">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                onIonChange={(e) => setEmail(e.target.value)}
              />
            </IonItem>
          </div>
          <div className="form-button-placement">
            <IonButton class="form-button" onClick={forgotPassword}>
              Send Email
            </IonButton>
            <div>
              Go back to <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ForgotPassword;
