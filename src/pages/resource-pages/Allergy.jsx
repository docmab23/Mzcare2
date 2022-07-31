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
import { useDatabase } from "../../contexts/DatabaseContext";

function Allergy() {
  const modal = useRef(null);
  const input = useRef(null);
  const [status, setStatus] = useState(false);
  const [allergyName, setAllergyName] = useState("");
  const [onsetDate, setDate] = useState("");
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  const {
    allergyJson,
    allergyList,
    setAllergyJson,
    setAllergyList,
  } = useDatabase();


  async function createallergy(e) {
    e.preventDefault()
    setBusy(true);
    const submitAllergyData = {};
    const allergyData = {
      allergyName: allergyName,
      onsetDate: onsetDate,
    };
    submitAllergyData[allergyName] = allergyData;
    allergyList.push(allergyName);
    for (let key in allergyJson) {
      submitAllergyData[key] = allergyJson[key];
    }
    setAllergyJson(submitAllergyData);
    setAllergyList(allergyList);
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
        {allergyList.map((item, pos) => {
          return (
            <IonCard key={pos}>
              <IonCardHeader>
                <IonCardTitle>
                  {allergyJson[item]["allergyName"]}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Onset Date: {allergyJson[item]["onsetDate"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
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
              <IonLabel position="floating">Allergy Source</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setAllergyName(e.target.value)}  d
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Onset date</IonLabel>
              <IonInput
                ref={input}
                type="date"
                onIonChange={(e) => setDate(e.target.value)}
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
