import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const AddAllergyModal = (props) => {
return (
    <IonModal isOpen={props.show}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={props.changestatus}>Cancel</IonButton>
        </IonButtons>
        <IonTitle>Add Allergy </IonTitle>
        <IonButtons slot="end">
          <IonButton strong={true} onClick={props.createallergy}>
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Allergy Source</IonLabel>
        <IonInput
          type="text"
          onIonChange={(e) => props.setAllergyName(e.target.value)} 
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Onset date</IonLabel>
        <IonInput
          type="date"
          onIonChange={(e) => props.setDate(e.target.value)}
        />
      </IonItem>
    </IonContent>
  </IonModal>
)
}

export default AddAllergyModal;