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
import FormTopBar from "../../components/FormTopBar";
import { setImmunization } from "../database";
import { useDatabase } from "../../contexts/DatabaseContext";

function ImmunizationsForm() {

  const [vaccineName, setVaccineName] = useState("");
  const [administer, setAdminister] = useState("");
  const [expiry, setExpiry] = useState("");
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  const { immunizationJson, immunizationList, setImmunizationJson, setImmunizationList } = useDatabase();

  async function createImmunization(e) {
	e.preventDefault();
	setBusy(true);
	const submitVaccineData = {}
	const vaccineData = {
		vaccineName: vaccineName,
		administerDate: administer,
		expiryDate: expiry
	}
	submitVaccineData[vaccineName] = vaccineData;
	immunizationList.push(vaccineName)
	for (let key in immunizationJson) {
		submitVaccineData[key] = immunizationJson[key];
	}
	setImmunizationJson(submitVaccineData);
	setImmunizationList(immunizationList)
	await setImmunization(submitVaccineData);
	setBusy(false);
	history.push("/immune");
}

	return (
		<IonPage>
      <IonContent className="ion-padding">
	  <FormTopBar/>
	  <IonLoading message="Adding immunization..." duration={0} isOpen={busy} />
	  {"\u00a0\u00a0\u00a0"}  
     <h1>{"\u00a0\u00a0\u00a0"} </h1>
	 <h1>Add Immunizations</h1>

	<form>
    <IonItem lines="full">
      <IonLabel position="floating">Vaccination Name</IonLabel>
	  <p></p>
      <IonInput type="text"  onIonChange={(e) => setVaccineName(e.target.value)} required></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating">Administred Date</IonLabel>
	  <p></p>
      <IonInput type="date" onIonChange={(e) => setAdminister(e.target.value)}></IonInput>
    </IonItem>
	<IonItem lines="full">
      <IonLabel position="floating">Expiry Date</IonLabel>
	  <p></p>
      <IonInput type="date" onIonChange={(e) => setExpiry(e.target.value)}></IonInput>
    </IonItem>
	 <p></p>
    <div>
	<IonButton class="form-button" expand="block" onClick={createImmunization}>Submit</IonButton>
	</div>
	</form>
     
      </IonContent>
	  <IonFooter>
	 
	<IonItem>
	<IonButton className="back-button" routerLink="/immune" >Back</IonButton>
	</IonItem>


	  </IonFooter>
    </IonPage>

	);
};

export default ImmunizationsForm;