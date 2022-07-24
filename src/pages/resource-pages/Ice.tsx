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
} from "@ionic/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { loginUser, reAuthenticate, updateUserPassword } from ".../firebase"
// import { toast } from ".../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
// import FormTopBar from "../components/FormTopBar";

const Ice: React.FC = () => {

	return (
		<IonPage>
      <IonContent className="ion-padding">
     <h1>Ice</h1>
     <div>
            <IonItem>
          <IonButton className="back-button" routerLink="/home">Back</IonButton>
          </IonItem>
          </div>
      </IonContent>
    </IonPage>
	);
};

export default Ice;