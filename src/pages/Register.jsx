import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonItem,
  IonLabel,
  IonText
} from "@ionic/react";
import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "../toast";
import { registerUser } from "../firebase";
import "./Register.css";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";

function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [busy, setBusy] = useState(false);
  const {signup} = useAuth();
  const {emailVerification} = useAuth();
  const currentUser = useAuth();

  async function register() {
    // validation
    setBusy(true);
    try {
      if (password !== cpassword) {
        return toast("Passwords do not match");
      }
      if (username.trim() === "" || password.trim() === "") {
        return toast("Username and password are required");
      }
  
      const res = await signup(username, password);
      // console.log(currentUser);
      if (res) {  
        await emailVerification();
        toast("Verify your email to Login");
        }
      }
      
    catch (e) {
      toast(e);
    }
    
    setBusy(false);
  }

  const resendEmailVerification = () => {
    setButtonDisabled(true)
    emailVerification()
    .then(() => {
      setButtonDisabled(false)
    }).catch((err) => {
      alert(err.message)
      setButtonDisabled(false)
    })
  }
  
  


  return (
    <IonPage>
      <IonContent className="ion-padding">
      <FormTopBar></FormTopBar>
        <IonLoading message="Registering..." duration={0} isOpen={busy} />
        <div className="ion-padding container">
        <div className="form-heading">
            <h1>SIGN UP</h1>
          </div>
          <div className="form-input-placement">
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              onIonChange={(e) => setUsername(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <IonItem lines="none" className="form-border">
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput
              type="password"
              onIonChange={(e) => setCPassword(e.target.value)}
            />
          </IonItem>
          </div>
          <div className="form-button-placement">
            <IonButton class="form-button" onClick={register}>
              SIGN UP
            </IonButton>
<<<<<<< HEAD
            <div className="padding-lign">
          <Link onClick={resendEmailVerification}
            disabled={buttonDisabled}>Resend Email</Link>
           </div>
          </div>
         
            Already signed up? <Link to="/login">Login</Link>
          
=======
          <div>
            Already signed up? <Link to="/login">Login</Link>
          </div>
          </div>
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
