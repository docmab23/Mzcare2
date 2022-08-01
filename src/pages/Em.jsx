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
	IonCardHeader,
	IonCardTitle,
	IonCard,
	IonRow,
	IonCol,
	IonGrid

	
} from "@ionic/react";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { loginUser, reAuthenticate, updateUserPassword } from ".../firebase"
// import { toast } from ".../toast";
// import { setUserState } from "../redux/actions";
import { useDispatch } from "react-redux";
// import FormTopBar from "../../components/FormTopBar";
// import { setImmunization } from "../../firebase";
import { useDatabase } from "../contexts/DatabaseContext";
  
import "./Em.css" ;

function Em() {
	var show_ = false;


	const {
		allergyJson,
		allergyList,
		setAllergyJson,
		setAllergyList,
		immunizationJson,
		immunizationList,
		setImmunizationJson,
		setImmunizationList,
		genJson,
		setGenJson,
		genList,
		setGenList,
		iceJson, 
		iceList,
		setICEJson, 
		setICEList


	  } = useDatabase();


	  if (allergyList.length !=0 ) {

		show_ = true;
	  }


	  console.log(show_);
	

  
	return (
		<IonPage>
      <IonContent className="ion-padding">
       
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <h1>General</h1>
		
        {genList.map((item, pos) => {
          return (
            <IonGrid>
				<IonRow className="info" key={pos}>
                 <IonCol>Name: {genJson[item]["Name"]}</IonCol> 
				 <IonCol>Age: {genJson[item]["Age"]}</IonCol>
				 <IonCol>Blood Group: {genJson[item]["Bloodgroup"]}</IonCol>
				</IonRow>
			</IonGrid>
			

);
})}
{iceList.map((item, pos) => {
          return (   
            <IonGrid>
				<IonRow className="info" key={pos}>
                 <IonCol>ICE Contact Name: {iceJson[item]["name"]}</IonCol> 
				 <IonCol>Contact No: : {iceJson[item]["number"]}</IonCol>
				</IonRow>
			</IonGrid>
			

);
})}

{{show_}=true && allergyList.map((item, pos) => {
          return (   
            <IonGrid>
				<IonRow className="info" key={pos}>
                 <IonCol>Allergy:{allergyJson[item]["allergyName"]}</IonCol> 
				</IonRow>
			</IonGrid>
			

);
})}






</IonContent>
</IonPage>
	);
}
export default Em;