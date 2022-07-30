import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonText,
  IonLabel,
  IonItem,
  IonFooter,
  IonCard,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import FormTopBar from "../../components/FormTopBar";
import { useDatabase } from "../../contexts/DatabaseContext";

function Immunizations() {
  const history = useHistory();
  const { immunizationJson, immunizationList } = useDatabase();
  // alert(vaccineName);
  const routeChange = () => {
    let path = `/immune-form`;
    history.push(path);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <h1>Immunizations</h1>
        {immunizationList.map((item, pos) => {
          return (
            <IonCard key={pos}>
              <IonCardHeader>
                <IonCardTitle>
                  {immunizationJson[item]["vaccineName"]}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Administred Date: {immunizationJson[item]["administerDate"]}
                </IonCardSubtitle>
                <IonCardSubtitle>
                  Expiry date: {immunizationJson[item]["expiryDate"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );

  // <IonItem>
  //   <IoIosAddCircleOutline
  //     height="40%"
  //     width="40%"
  //     onClick={routeChange}
  //   />
  // </IonItem>
  //       <IonButton className="back-button" routerLink="/home">Back</IonButton>
  //     </IonContent>
  //     <IonFooter></IonFooter>
  //   </IonPage>
  // );
}

export default Immunizations;
