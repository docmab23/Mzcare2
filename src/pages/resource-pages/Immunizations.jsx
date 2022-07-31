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
  IonModal,
  IonButtons,
} from "@ionic/react";

import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormTopBar from "../../components/FormTopBar";
import { useDatabase } from "../../contexts/DatabaseContext";
import { setImmunization } from "../database";

function Immunizations() {
  const [status, setStatus] = useState(false);
  const input = useRef(null);
  const [vaccineName, setVaccineName] = useState("");
  const [administer, setAdminister] = useState("");
  const [expiry, setExpiry] = useState("");
  const [busy, setBusy] = useState(false);
  const {
    immunizationJson,
    immunizationList,
    setImmunizationJson,
    setImmunizationList,
  } = useDatabase();

  function changestatus() {
    setStatus(!status);
  }

  async function createImmunization(e) {
    e.preventDefault();
    setBusy(true);
    const submitVaccineData = {};
    const vaccineData = {
      vaccineName: vaccineName,
      administerDate: administer,
      expiryDate: expiry,
    };
    submitVaccineData[vaccineName] = vaccineData;
    immunizationList.push(vaccineName);
    for (let key in immunizationJson) {
      submitVaccineData[key] = immunizationJson[key];
    }
    setImmunizationJson(submitVaccineData);
    setImmunizationList(immunizationList);
    await setImmunization(submitVaccineData);
    setBusy(false);
    setStatus(!status);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <h1>Immunizations</h1>
        {immunizationList.map((item, pos) => {
          return (
            <IonCard key={pos}>
              <IonCardHeader>
                <IonCardTitle>
                  {immunizationJson[item]["vaccineName"]}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Administred Date: {immunizationJson[item]["administerDate"]}
                </IonCardSubtitle>
                <IonCardSubtitle>
                  Expiry date: {immunizationJson[item]["expiryDate"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
        <IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add Immunizations
        </IonButton>

        <IonModal isOpen={status}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={changestatus}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Immunization </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={createImmunization}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem lines="full">
              <IonLabel position="floating">Vaccination Name</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => setVaccineName(e.target.value)}
                required
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="stacked">Administred Date</IonLabel>
              <IonInput
                type="date"
                onIonChange={(e) => setAdminister(e.target.value)}
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="stacked">Expiry Date</IonLabel>
              <IonInput
                type="date"
                onIonChange={(e) => setExpiry(e.target.value)}
              ></IonInput>
            </IonItem>
          </IonContent>
        </IonModal>

        <IonButton className="back-button" routerLink="/home">
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Immunizations;
