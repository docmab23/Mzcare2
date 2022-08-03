import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const AddConditionModal = (props) => {
return (
    <IonModal isOpen={props.show}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={props.changestatus}>Cancel</IonButton>
        </IonButtons>
        <IonTitle>Add Condition </IonTitle>
        <IonButtons slot="end">
          <IonButton strong={true} onClick={props.createCondition}>
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Condition</IonLabel>
        <IonInput
          type="text"
          onIonChange={(e) => props.setConditionName(e.target.value)} 
        />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Status</IonLabel>
        <IonSelect onIonChange={(e) => props.setDate(e.target.value)} >
          <IonSelectOption value="Active">Active</IonSelectOption>
          <IonSelectOption value="Resolved">Resolved</IonSelectOption>
          <IonSelectOption value="Unknown">Unknown</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonContent>
  </IonModal>
)
}

export default AddConditionModal;