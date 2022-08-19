import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const EditICEModal = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.delete}>Delete</IonButton>
              </IonButtons>
              <IonTitle> Edit Contact Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={props.edit}>
                  Save
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Contact Name</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.name(e.target.value)}
                value={props.editName}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Number</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.contact(e.target.value)}
                value={props.editContact}
              />
            </IonItem>
          </IonContent>
        </IonModal>
)
}

export default EditICEModal;