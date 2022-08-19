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
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
import FormTopBar from "../components/FormTopBar";
import { useAuth } from "../contexts/AuthContext";
import { errors } from "../utils/Utils";




function Settings () {
	
    const {logout} = useAuth();
    const history = useHistory();
    const {currentUser} = useAuth();


    async function logout_user () {

        await logout();
        toast("You have been logged out!");
        history.replace("/login");
    }

    if (currentUser === null) {
        return (<Redirect to="/login"/>)
      }

	return (
		<IonPage>
      <IonContent className="ion-padding">
      <FormTopBar/>
      <div className="ion-padding container">
        <IonText>
            <h2> {"\u00a0\u00a0\u00a0"}
        {"\u00a0\u00a0\u00a0"} </h2>
          </IonText>
        
       <IonButton  routerLink="/changePassword">
       {" "}
        CHANGE PASSWORD  {" "}
       </IonButton>
       <IonButton  routerLink="/changeEmail">
       {" "}
        CHANGE EMAIL  {" "}
       </IonButton>

       <IonButton onClick={logout_user}>
       {" "}
        LOGOUT   {" "}
       </IonButton>
       </div>
      </IonContent>
    </IonPage>
	);
};

export default Settings;