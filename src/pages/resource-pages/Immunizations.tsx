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
import { useDispatch, useSelector } from "react-redux";
import FormTopBar from "../../components/FormTopBar";
import { IoIosAddCircleOutline } from "react-icons/io";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { ok } from "assert";

const Immunizations: React.FC = () => {
  const history = useHistory();
  const vaccineName = useSelector((state: any = {}) => state.immunization.vaccine);
  console.log(vaccineName)
  const routeChange = () => {
    let path = `/immune-form`;
    history.push(path);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        <p> </p>
        <h1>Immunizations</h1>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>HPV</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonCardSubtitle>Administred Date: 05/12/13</IonCardSubtitle>
            <IonCardSubtitle>Expiry date: 05/12/21</IonCardSubtitle>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>k</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonCardSubtitle>Administered Date: 05/12/13</IonCardSubtitle>
            <IonCardSubtitle>Expiry date: 05/12/21</IonCardSubtitle>
          </IonCardContent>
        </IonCard>

        <IonItem>
          <IoIosAddCircleOutline
            height="40%"
            width="40%"
            onClick={routeChange}
          />
        </IonItem>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default Immunizations;
