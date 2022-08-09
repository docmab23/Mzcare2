import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const EditGeneralModal = (props) => {
return (

    <IonModal isOpen={props.show}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit General info</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={props.edit}>
                    Save
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => props.name(e.target.value)}
                  value={props.editName} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Age</IonLabel>
                <IonInput
                  type="number"
                  onIonChange={(e) => props.age(e.target.value)}
                  value={props.editAge} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Blood group</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => props.bgroup(e.target.value)}
                  value={props.editbgroup}/>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Height (in cm)</IonLabel>
                <IonInput
                  type="number"
                  onIonChange={(e) => props.height(e.target.value)}
                  value={props.editheight} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Family physician(if any)</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => props.f_physician(e.target.value)}
                  value={props.editphys} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Ethinicity</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.ethinicity(e.target.value)}
                  value={props.editethinicity}/>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Street Address</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.staddress(e.target.value)}
                  value={props.editaddress} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">City</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.city(e.target.value)}
                  value={props.editcity} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">State</IonLabel>

                <IonInput
                 type="text"
                 onIonChange={(e) => props.state(e.target.value)}
                 value={props.editstate} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Zip/Postal code</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.zip(e.target.value)}
                  value={props.editzip} />
              </IonItem>
            </IonContent>
          </IonModal>
          
)
}

export default EditGeneralModal;