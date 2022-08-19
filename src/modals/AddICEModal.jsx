import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const AddICEModal = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.close}>Cancel</IonButton>
              </IonButtons>
              <IonTitle> Add Contact Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={props.create} >
                  Confirm
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
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Number</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.contact(e.target.value)}
              />
            </IonItem>
          </IonContent>
        </IonModal>
)
}

export default AddICEModal;