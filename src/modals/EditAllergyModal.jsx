import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const EditAllergyModal = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.edit}>Save</IonButton>
              </IonButtons>
              <IonTitle> Edit Allergy Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={props.delete}>
                  Delete
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Allergy Source</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.name(e.target.value)}
                value={props.editName}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Onset Date</IonLabel>
              <IonInput
                type="date"
                onIonChange={(e) => props.date(e.target.value)}
                value={props.editDate}
              />
            </IonItem>
          </IonContent>
        </IonModal>
)
}

export default EditAllergyModal;