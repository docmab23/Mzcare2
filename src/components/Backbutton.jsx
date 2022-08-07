import React from 'react'
import { useHistory } from "react-router";
import back from "../images/back.svg";
import {
    IonContent,
    IonPage,
    IonButton,
    IonCard,
    IonCol,
    IonCardSubtitle,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonModal,
    IonRow,
    IonGrid,
    IonButtons,
  } from "@ionic/react";

function BackButton(props){


   

    return(

        <IonGrid>
        <h1>
          <IonRow className="home">
            <IonCol>
              <div>
                <IonButton routerLink="/home" color="light">
                <IonIcon src={back}></IonIcon>
                </IonButton>
              </div>{" "}
            </IonCol>
            <IonCol className="ion-align-self-center heading">
              {props.page}
            </IonCol>
            <IonCol className="ion-align-self-end">
            </IonCol>
          </IonRow>
          </h1>
        </IonGrid>
    )


}


export default BackButton;