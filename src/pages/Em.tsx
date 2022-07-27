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
  import { resetPassword } from "../firebase";
  import { toast } from "../toast";
  // import { setUserState } from "../redux/actions";
  import { useDispatch } from "react-redux";
  import FormTopBar from "../components/FormTopBar";
  
  const Em: React.FC = () => {
    
    
  
    return (
      <IonPage>
        Hello
      </IonPage>
    );
  
  }
  export default Em ; 
  