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
  IonCard,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButtons,
  IonModal,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import FormTopBar from "../../components/FormTopBar";
import { setAllergy } from "../database";

function Allergy() {
  const modal = useRef(null);
  const input = useRef(null);
  const [status, setStatus] = useState(false);
  const [allergyName, setAllergyName] = useState("");
  const [date_, setDate] = useState("");
  const [busy, setBusy] = useState(false);
  const history = useHistory();

  async function createallergy() {
    setBusy(true);
    const submitAllergyData = {};
    const allergyData = {
      allergyName: allergyName,
      administerDate: date_,
    };
    submitAllergyData[allergyName] = allergyData;
    console.log("ok");
    await setAllergy(submitAllergyData);
    setBusy(false);
    setStatus(!status);
  }

  function changestatus() {
    setStatus(!status);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <h1>Allergies</h1>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Peanuts</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonCardSubtitle>Onset date: 05/12/1999</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pollen</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonCardSubtitle>Onset date: 05/12/13</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add Allergy
        </IonButton>

        <IonModal isOpen={status}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={changestatus}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Allergy </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={createallergy}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter Allergy</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setAllergyName(e.target.value)}
                placeholder="Allergy source"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Enter Onset date</IonLabel>
              <IonInput
                ref={input}
                type="date"
                onIonChange={(e) => setDate(e.target.value)}
                placeholder="Onset Date"
              />
            </IonItem>
          </IonContent>
        </IonModal>
        <IonButton className="back-button" routerLink="/home">
          Back
        </IonButton>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default Allergy;
