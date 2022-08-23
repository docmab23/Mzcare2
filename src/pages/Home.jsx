import {
  IonContent,
  IonPage,
  IonButton,
  IonText,
  useIonViewDidEnter,
} from "@ionic/react";
import { Redirect, useHistory } from "react-router-dom";
import React from "react";
import "./Register.css";
import FormTopBar from "../components/FormTopBar";
import "./Home.css";
import { useAuth } from "../contexts/AuthContext";
import { showTabBar } from "../utils/Utils";

function Home() {
  const history = useHistory();
  const { currentUser } = useAuth();
  async function goImmunization() {
    history.replace("/immune");
  }

  useIonViewDidEnter(() => {
    showTabBar();
  });

  if (currentUser === null) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="bar bar-header bar-positive">
          <FormTopBar />
        </div>
        <h2>{"\u00a0\u00a0\u00a0"}</h2>
        <div className="ion-padding container">
          <IonText>
            <h2>
              {" "}
              {"\u00a0\u00a0\u00a0"}
              {"\u00a0\u00a0\u00a0"}
              {"\u00a0\u00a0\u00a0"}{" "}
            </h2>
          </IonText>

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
        <div>
          <IonButton routerLink="/camera">
            Upload your Medical Records
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Home;
