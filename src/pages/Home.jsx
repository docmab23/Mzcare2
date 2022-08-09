import { IonContent, IonPage, IonButton, IonItem, IonText } from "@ionic/react";
import { Redirect, useHistory } from "react-router-dom";
import React from "react";
import "./Register.css";

import FormTopBar from "../components/FormTopBar";
import "./Home.css";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const history = useHistory();
  const { currentUser } = useAuth();
  async function goImmunization() {
    history.replace("/immune");

  
  }

<<<<<<< HEAD
    


=======
  if (currentUser === null) {
    return <Redirect to="/login" />;
  }
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <div className="ion-padding container">
          <IonText>
            <h2>
              {" "}
              {"\u00a0\u00a0\u00a0"}
              {"\u00a0\u00a0\u00a0"}{" "}
            </h2>
          </IonText>
<<<<<<< HEAD
         
            <IonButton className="rbutton" routerLink="/general">
              {" "}
              General Info{" "}
            </IonButton>
            
        
            <IonButton className="rbutton" routerLink="/allergy">
              {" "}
              Allergies{" "}
            </IonButton>
         
=======

          <IonButton className="rbutton" routerLink="/general">
            {" "}
            General Info{" "}
          </IonButton>
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4

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
}

export default Home;
