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
          <IonText>
            <h2></h2>
          </IonText>
          <IonItem></IonItem>
          <IonItem>
            <IonButton className="rbutton" routerLink="/general">
              {" "}
              General Info{" "}
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton className="rbutton" routerLink="/allergy">
              {" "}
              Allergies{" "}
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton className="rbutton" onClick={goImmunization}>
              {" "}
              Immunizations{" "}
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton className="rbutton" routerLink="/ice">
              {" "}
              ICE details{" "}
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton className="rbutton" routerLink="/condition">
              {" "}
              Conditions{" "}
            </IonButton>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
