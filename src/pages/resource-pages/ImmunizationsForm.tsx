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
import { useDispatch, useSelector } from "react-redux";
import FormTopBar from "../../components/FormTopBar";
import { addVaccine, setImmunization } from "../database";

const ImmunizationsForm: React.FC = () => {

	const [vaccineName, setVaccineName] = useState("");
  const [administer, setAdminister] = useState("");
  const [expiry, setExpiry] = useState("");
  const [busy, setBusy] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  

  async function createImmunization() {
	setBusy(true);
	const submitVaccineData: any = {}
	const vaccineData = {
		vaccineName: vaccineName,
		administerDate: administer,
		expiryDate: expiry
	}
	submitVaccineData[vaccineName] = vaccineData;
	dispatch(addVaccine(vaccineName));
	await setImmunization(submitVaccineData);
	setBusy(false);
	history.replace("/immune");
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
      <IonInput type="text"  onIonChange={(e: any) => setVaccineName(e.target.value)} required></IonInput>
    </IonItem>
    <IonItem lines="full">
      <IonLabel position="floating">Administred Date</IonLabel>
	  <p></p>
      <IonInput type="date" onIonChange={(e: any) => setAdminister(e.target.value)}></IonInput>
    </IonItem>
	<IonItem lines="full">
      <IonLabel position="floating">Expiry Date</IonLabel>
	  <p></p>
      <IonInput type="date" onIonChange={(e: any) => setExpiry(e.target.value)}></IonInput>
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