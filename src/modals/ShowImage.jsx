import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const ShowImage = (props) => {
return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={props.close}>Close</IonButton>
              </IonButtons>
              <IonTitle> Add Contact Details </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <img src={props.image}></img>
            </IonItem>
          </IonContent>
        </IonModal>
)
}

export default ShowImage;