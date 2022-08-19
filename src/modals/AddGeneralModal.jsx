import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { US_Cities, US_States } from "../utils/USList";

const AddGeneralModal = (props) => {
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.changeStatus}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Add Info</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={props.create}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => props.setName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Age</IonLabel>
          <IonInput
            type="number"
            onIonChange={(e) => props.setAge(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Blood group</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => props.setBgroup(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Height (in cm)</IonLabel>
          <IonInput
            type="number"
            onIonChange={(e) => props.setHeight(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Family physician(if any)</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => props.setFphysician(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Ethinicity</IonLabel>

          <IonInput
            type="text"
            onIonChange={(e) => props.setEthinicity(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Street Address</IonLabel>

          <IonInput
            type="text"
            onIonChange={(e) => props.setAddress(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">State</IonLabel>
          <IonSelect onIonChange={(e) => props.setState(e.target.value)}>
            {US_States.map((item, pos) => {
              return <IonSelectOption value={item}>{item}</IonSelectOption>;
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">City</IonLabel>
          <IonSelect onIonChange={(e) => props.setCity(e.target.value)}>
            {props.state !== "" &&
              US_Cities[props.state].map((item, pos) => {
                return <IonSelectOption value={item}>{item}</IonSelectOption>;
              })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Zip/Postal code</IonLabel>

          <IonInput
            type="number"
            onIonChange={(e) => props.setZip(e.target.value)}
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default AddGeneralModal;
