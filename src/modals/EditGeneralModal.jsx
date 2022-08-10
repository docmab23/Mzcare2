import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'

const EditGeneralModal = (props) => {
return (

    <IonModal isOpen={props.show}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Edit General info</IonTitle>
                <IonButtons slot="start">
                <IonButton onClick={props.cancel}>Cancel</IonButton>
              </IonButtons>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={props.save}>
                    Save
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditName(e.target.value)}
                  value={props.editName} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Age</IonLabel>
                <IonInput
                  type="number"
                  onIonChange={(e) => props.setEditAge(e.target.value)}
                  value={props.editAge} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Blood group</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditBgroup(e.target.value)}
                  value={props.editBgroup}/>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Height (in cm)</IonLabel>
                <IonInput
                  type="number"
                  onIonChange={(e) => props.setEditHeight(e.target.value)}
                  value={props.editHeight} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Family physician(if any)</IonLabel>
                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditFphysician(e.target.value)}
                  value={props.editFphysician} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Ethinicity</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditEthinicity(e.target.value)}
                  value={props.editEthinicity}/>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Street Address</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditAddress(e.target.value)}
                  value={props.editAddress_} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">City</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditCity(e.target.value)}
                  value={props.editCity} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">State</IonLabel>

                <IonInput
                 type="text"
                 onIonChange={(e) => props.setEditState(e.target.value)}
                 value={props.editState} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Zip/Postal code</IonLabel>

                <IonInput
                  type="text"
                  onIonChange={(e) => props.setEditZip(e.target.value)}
                  value={props.editZip} />
              </IonItem>
            </IonContent>
          </IonModal>
          
)
}

export default EditGeneralModal;