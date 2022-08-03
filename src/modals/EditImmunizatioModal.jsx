import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const EditImmunizationModal = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.edit}>Save</IonButton>
              </IonButtons>
              <IonTitle> Edit Vaccine Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={props.delete}>
                  Delete
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Vaccine Name</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.name(e.target.value)}
                value={props.editName}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Administer Date</IonLabel>
              <IonInput
                type="date"
                onIonChange={(e) => props.administer(e.target.value)}
                value={props.editAdminister}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Expiry Date</IonLabel>
              <IonInput
                type="date"
                onIonChange={(e) => props.expiry(e.target.value)}
                value={props.editExpiry}
              />
            </IonItem>
          </IonContent>
        </IonModal>
)
}

export default EditImmunizationModal;