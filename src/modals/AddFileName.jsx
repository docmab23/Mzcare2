import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const AddFileName = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.close}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>File name</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={props.close} >
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">File Name</IonLabel>
              <IonInput
                type="text"
                onIonChange={(e) => props.name(e.target.value)}
              />
            </IonItem>
            
          </IonContent>
        </IonModal>
)
}

export default AddFileName;