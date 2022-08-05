import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
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
        <IonText>
            <h2> {"\u00a0\u00a0\u00a0"}
        {"\u00a0\u00a0\u00a0"} </h2>
          </IonText>
          <IonItem></IonItem>
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
