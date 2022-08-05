import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonButton,
	IonLabel,
	IonItem,
	IonFooter,
	IonCard,
	IonCardSubtitle,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonButtons,
	IonModal,
  } from "@ionic/react";
  
  import React, { useState, useRef } from "react";
  import { useHistory } from "react-router-dom";
  import FormTopBar from "../../components/FormTopBar";
  import { setGeneral } from "../database";
  import { useDatabase } from "../../contexts/DatabaseContext";
  
  function General(props) {
	const input = useRef(null);
	const [status, setStatus] = useState(props.tell);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [height, setHeight] = useState("");
	const [bgroup, setBgroup] = useState("");
	const [fphysician, setFphysician] = useState("");
	const [ethinicity, setEthinicity] = useState("");
	const [address_, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const [busy, setBusy] = useState(false);
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
		Ethinicity: ethinicity,
		Str_address: address_,
		State: state,
		City: city,
		Zip: zip

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
				<IonCardSubtitle>
                  Full Address: {genJson[item]["Str_address"]+", "+genJson[item]["City"]+", "+genJson[item]["State"]+", "+genJson[item]["Zip"]}
                </IonCardSubtitle>
				
              </IonCardContent>
            </IonCard>
          );
        })}

        {genList.length == 0 && <><IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add General Info
        </IonButton><IonModal isOpen={status}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={changestatus}>Cancel</IonButton>
                </IonButtons>
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
                  onIonChange={(e) => setName(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Age</IonLabel>
                <IonInput
                  ref={input}
                  type="number"
                  onIonChange={(e) => setAge(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Blood group</IonLabel>
                <IonInput
                  ref={input}
                  type="text"
                  onIonChange={(e) => setBgroup(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Height (in cm)</IonLabel>
                <IonInput
                  ref={input}
                  type="number"
                  onIonChange={(e) => setHeight(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Family physician(if any)</IonLabel>
                <IonInput
                  ref={input}
                  type="text"
                  onIonChange={(e) => setFphysician(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Ethinicity</IonLabel>

                <IonInput
                  ref={input}
                  type="text"
                  onIonChange={(e) => setEthinicity(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Street Address</IonLabel>

                <IonInput
                  ref={input}
                  type="text"
                  onIonChange={(e) => setAddress(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">City</IonLabel>

                <IonInput
                  ref={input}
                  type="text"
                  onIonChange={(e) => setCity(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">State</IonLabel>

                <IonInput
                  ref={input}
                  type="text"
                  onIonChange={(e) => setState(e.target.value)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Zip/Postal code</IonLabel>

                <IonInput
                  ref={input}
                  type="number"
                  onIonChange={(e) => setZip(e.target.value)} />
              </IonItem>
            </IonContent>
          </IonModal></>}
          <IonButton className="back-button" routerLink="/home">
            Back
          </IonButton>
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage> 
	 
	);
  }
  
  export default General;
  