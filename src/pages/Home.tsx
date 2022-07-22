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
    IonText,
  } from "@ionic/react";
  import React, { useState , useEffect } from "react";
 
  import { Link } from "react-router-dom";
  import { toast } from "../toast";
  import { registerUser } from "../firebase";
  import "./Register.css";
  import {auth} from "../firebase" ; 
  // import FormTopBar from "../components/FormTopBar";
  import { getCurrentUser } from "../firebase";
  // import  {onAuthStateChange} from "../firebase";
  import {logoutUser} from "../firebase";
  import FormTopBar from "../components/FormTopBar";
  import "./Home.css";


  const Home: React.FC = () => {
    const [user, setUser] = useState( {loggedIn: false} );
    const [error, setError] = useState("");
    const [busy, setBusy] = useState<boolean>(false);
   /* useEffect(() => {
      const unsubscribe = onAuthStateChange(setUser);
      return () => {
        unsubscribe();
      }
    }, []);  */
   



    return (
        <IonPage>
        <IonContent className="ion-padding">
        <FormTopBar/>
          <IonLoading message="Registering..." duration={0} isOpen={busy} />
          <div className="ion-padding container">
          <IonText >
            <h2>
              Home sweet home 
              </h2></IonText>
              <IonItem>

              </IonItem>
            <IonItem>
              <IonButton className="rbutton"  routerLink="/register"> General Info </IonButton>
            </IonItem>
          
            <IonItem>
            <IonButton className="rbutton"> Allergies </IonButton>
            </IonItem>
    
            <IonItem>
            <IonButton className="rbutton" > Immunizations </IonButton>
            </IonItem>

            <IonItem>
            <IonButton className="rbutton"> ICE details </IonButton>
            </IonItem>
            
          </div>
        </IonContent>
      </IonPage>
    
    );
  };
  
  export default Home;
  