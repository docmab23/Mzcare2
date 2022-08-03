import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const EditConditionModal = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.edit}>Save</IonButton>
              </IonButtons>
              <IonTitle> Edit Condition Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={props.delete}>
                  Delete
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Condition</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.name(e.target.value)}
                value={props.editName}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Status</IonLabel>
              <IonSelect onIonChange={(e) => props.status(e.target.value)} value={props.editStatus} >
          <IonSelectOption value="Active">Active</IonSelectOption>
          <IonSelectOption value="Resolved">Resolved</IonSelectOption>
          <IonSelectOption value="Unknown">Unknown</IonSelectOption>
        </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>
)
}

export default EditConditionModal;