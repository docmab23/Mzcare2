import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const ForgotPassword = (props) => {
return (
    <IonModal isOpen={props.show}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={props.changestatus}>Cancel</IonButton>
        </IonButtons>
        <IonTitle>Forgot Password</IonTitle>
        <IonButtons slot="end">
          <IonButton strong={true} onClick={props.sendmail}>
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          type="text"
          onIonChange={(e) => props.setEmailforgot(e.target.value)} 
        />
      </IonItem>
     
      
    </IonContent>
  </IonModal>
)
}

export default ForgotPassword;