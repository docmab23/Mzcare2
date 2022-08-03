import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const AddImmunizationModal = (props) => {
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.changestatus}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add Immunization </IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={props.create}>
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
            onIonChange={(e) => props.vaccine(e.target.value)}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="stacked">Administred Date</IonLabel>
          <IonInput
            type="date"
            onIonChange={(e) => props.administer(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="stacked">Expiry Date</IonLabel>
          <IonInput
            type="date"
            onIonChange={(e) => props.expiry(e.target.value)}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default AddImmunizationModal;
