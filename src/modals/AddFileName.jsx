import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar, IonText } from '@ionic/react';
import React from 'react'

const AddFileName = (props) => {

function close() {
  props.savePhoto(props.photo);
  props.close();
}

return (
    <IonModal isOpen={props.show}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>File name</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={close} >
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">File Name<IonText>.png</IonText></IonLabel>
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