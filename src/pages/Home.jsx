import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import React from "react";
import "./Register.css";

import FormTopBar from "../components/FormTopBar";
import "./Home.css";


function Home() {
  const history = useHistory();
  async function goImmunization() {
    history.replace("/immune");
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <div className="ion-padding container">
<<<<<<< HEAD
          <IonText>
            <h2></h2>
          </IonText>
          <IonItem></IonItem>
         
=======
          <IonItem>
>>>>>>> ad501b5afc0bce2642842d0371d4743fcc444dc0
            <IonButton className="rbutton" routerLink="/general">
              {" "}
              General Info{" "}
            </IonButton>
         

        
            <IonButton className="rbutton" routerLink="/allergy">
              {" "}
              Allergies{" "}
            </IonButton>
         

          
            <IonButton className="rbutton" onClick={goImmunization}>
              {" "}
              Immunizations{" "}
            </IonButton>
       

          
            <IonButton className="rbutton" routerLink="/ice">
              {" "}
              ICE details{" "}
            </IonButton>

            <IonButton className="rbutton" routerLink="/condition">
              {" "}
              Conditions{" "}
            </IonButton>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
