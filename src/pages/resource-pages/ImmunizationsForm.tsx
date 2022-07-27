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
	
} from "@ionic/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { loginUser, reAuthenticate, updateUserPassword } from ".../firebase"
// import { toast } from ".../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../../components/FormTopBar";

const ImmunizationsForm: React.FC = () => {

	return (
		<IonPage>
      <IonContent className="ion-padding">
	  <FormTopBar/>
	  {"\u00a0\u00a0\u00a0"}  
     <h1>{"\u00a0\u00a0\u00a0"} </h1>
	 <h1>Add Immunizations</h1>

	<form>
    <IonItem lines="full">
      <IonLabel position="floating">Vaccination Name</IonLabel>
	  <p></p>
      <IonInput type="text" required></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating">Administred Date</IonLabel>
	  <p></p>
      <IonInput type="date" ></IonInput>
    </IonItem>
	<IonItem lines="full">
      <IonLabel position="floating">Expiry Date</IonLabel>
	  <p></p>
      <IonInput type="date" ></IonInput>
    </IonItem>
	 <p></p>
    <div>
	<IonButton type="submit" expand="block">Submit</IonButton>
	</div>
	</form>
     
      </IonContent>
	  <IonFooter>
	 
	<IonItem>
	<IonButton className="back-button" routerLink="/immune">Back</IonButton>
	</IonItem>


	  </IonFooter>
    </IonPage>

	);
};

export default ImmunizationsForm;