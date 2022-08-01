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
	IonButtons,
	IonModal,
  } from "@ionic/react";
  
  import React, { useState, useRef } from "react";
  import { useHistory } from "react-router-dom";
  import FormTopBar from "../../components/FormTopBar";
  import { setGeneral } from "../database";
  import { useDatabase } from "../../contexts/DatabaseContext";
  
  function Allergy() {
	const modal = useRef(null);
	const input = useRef(null);
	const [status, setStatus] = useState(false);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [height, setHeight] = useState("");
	const [bgroup, setBgroup] = useState("");
	const [fphysician, setFphysician] = useState("");
	const [ethinicity, setEthinicity] = useState("");
	const [busy, setBusy] = useState(false);
	const history = useHistory();
	const {
	  genJson,
	  setGenJson,
	  genList,
	  setGenList
	} = useDatabase();
  
  
	async function creategeneral(e) {
	  e.preventDefault()
	  setBusy(true);
	  const submitGeneralData = {};
	  const generalData = {
		Name: name,
		Age: age,
		Bloodgroup: bgroup,
		Height: height,
		Family_physician: fphysician,
		Ethinicity: ethinicity

	  };
	  submitGeneralData[name] = generalData;
	  genList.push(name);
	  for (let key in genJson) {
		submitGeneralData[key] = genJson[key];
	  }
	  setGenJson(submitGeneralData);
	  setGenList(genList);
	  await setGeneral(submitGeneralData);
	  setBusy(false);
	  setStatus(!status);
	}
  
	function changestatus() {
	  setStatus(!status);
	}
  
	return (
		<IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <h1>General</h1>
        {genList.map((item, pos) => {
          return (
            <IonCard key={pos}>
              <IonCardHeader>
                <IonCardTitle>
                  Name: {genJson[item]["Name"]}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Age: {genJson[item]["Age"]}
                </IonCardSubtitle>
				<IonCardSubtitle>
                  Blood group: {genJson[item]["Bloodgroup"]}
                </IonCardSubtitle>
				<IonCardSubtitle>
                  Height: {genJson[item]["Height"]}
                </IonCardSubtitle>
				<IonCardSubtitle>
                  Family physician: {genJson[item]["Family_physician"]}
                </IonCardSubtitle>
				<IonCardSubtitle>
                  Ethinicity: {genJson[item]["Ethinicity"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
        <IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add General Info
        </IonButton>

        <IonModal isOpen={status}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={changestatus}>Cancel</IonButton>
              </IonButtons>
			  //genList.length=0
              <IonTitle>Add Allergy </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={creategeneral}>  
                  Confirm
                </IonButton> 
              </IonButtons> 
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setName(e.target.value)}  
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Age</IonLabel>
              <IonInput
                ref={input}
                type="number"
                onIonChange={(e) => setAge(e.target.value)}
              />
            </IonItem>
			<IonItem>
              <IonLabel position="stacked">Blood group</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setBgroup(e.target.value)}
              />
            </IonItem>
			<IonItem>
              <IonLabel position="stacked">Height (in cm)</IonLabel>
              <IonInput
                ref={input}
                type="number"
                onIonChange={(e) => setHeight(e.target.value)}
              />
            </IonItem>
			<IonItem>
              <IonLabel position="stacked">Family physician(if any)</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setFphysician(e.target.value)}
              />
            </IonItem>
			<IonItem>
              <IonLabel position="stacked">Ethinicity</IonLabel>
			  
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setEthinicity(e.target.value)}
              />
            </IonItem>
          </IonContent>
        </IonModal>
        <IonButton className="back-button" routerLink="/home">
          Back
        </IonButton>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
	 
	);
  }
  
  export default Allergy;
  