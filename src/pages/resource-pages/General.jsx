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
  IonGrid,
  IonRow,
  IonCol,
<<<<<<< HEAD
  IonIcon
  } from "@ionic/react";
  
  import React, { useState, useRef } from "react";
  import { useHistory } from "react-router-dom";
  import FormTopBar from "../../components/FormTopBar";
  import { setGeneral } from "../database";
  import { useDatabase } from "../../contexts/DatabaseContext";
  import back from "../../images/back.svg";
  import EditGeneralModal from "../../modals/EditGeneralModal";
  import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { useAuth } from "../../contexts/AuthContext";
import EditAllergyModal from "../../modals/EditAllergyModal";
  
  function General(props) {
	const input = useRef(null);
	const [status, setStatus] = useState(props.tell);
	const [Name, setName] = useState("");
	const [age, setAge] = useState("");
	const [height, setHeight] = useState("");
	const [bgroup, setBgroup] = useState("");
	const [fphysician, setFphysician] = useState("");
  const [editName, setEditName] = useState("");
  const [originalEditName, setOriginalEditName] = useState("");
  const [editbgroup, setEditBloodgroup] = useState("");
  const [editheight, setEditHeight] = useState("");
  const [editphys, setEditPhysician] = useState("");
  const [editethinicity, setEditEthinicity] = useState("");
  const [editstraddress, setEditStr_address] = useState("");
  const [editage, setEditAge] = useState("");
  const [editcity, setEditCity] = useState("");
  const [editstate, setEditState] = useState("");
  const [editzip, setEditZip] = useState("");
	const [ethinicity, setEthinicity] = useState("");
	const [address_, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const [busy, setBusy] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const history = useHistory();
	const {
	  genJson,
	  setGenJson,
	  genList,
	  setGenList
	} = useDatabase();

  const { currentUser } = useAuth();
  
  function changeEditStatus(jsonToEdit) {
    setEditName(jsonToEdit["Name"]);
    setOriginalEditName(jsonToEdit["Name"]);
    setEditAge(jsonToEdit["Age"]);
    setEditBloodgroup(jsonToEdit["Bloodgroup"]);
    setEditHeight(jsonToEdit["Height"]);
    setEditPhysician(jsonToEdit["Family_physician"]);
    setEditEthinicity(jsonToEdit["Ethinicity"]);
    setEditStr_address(jsonToEdit["Str_address"]);
    setEditCity(jsonToEdit["City"]);
    setEditState(jsonToEdit["State"]);
    setEditZip(jsonToEdit["Zip"]);
    setEditStatus(!editStatus);
  }

  async function editGeneral(e) {
    e.preventDefault();
    const genRef = doc(db, currentUser.uid + "/general");
    const submitGeneralData = {};
    const generalData = {
      Name: Name,
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
    submitGeneralData[editName] = generalData;
    if (originalEditName === editName) {
      updateDoc(genRef, submitGeneralData);
    } else {
      genList.push(editName);
      for (let key in genJson) {
        submitGeneralData[key] = genJson[key];
      }
      setGenJson(submitGeneralData);
      setGenList(genList);
      await setGeneral(submitGeneralData);
      await updateDoc(genRef, {
        [originalEditName]: deleteField(),
      });
    }
    const genLinks = [];
    await getDoc(genRef).then((docSnap) => {
      if (docSnap.exists()) {
        const generalData = docSnap.data();
        for (let key in generalData) {
          genLinks.push(key);
        }
        setGenList(genLinks);
        setGenJson(generalData);
      }
    });
    setEditStatus(!editStatus);
  }

 


  console.log(editStatus);
	async function creategeneral(e) {
	  e.preventDefault()
	  setBusy(true);
	  const submitGeneralData = {};
	  const generalData = {
		Name: Name,
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
	  submitGeneralData[Name] = generalData;
	  genList.push(Name);
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
  function changeroute(){
    history.replace("/home")
  }
  
	return (
		<><IonPage>
=======
  IonIcon,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import FormTopBar from "../../components/FormTopBar";
import { setGeneral } from "../database";
import { useDatabase } from "../../contexts/DatabaseContext";
import { useAuth } from "../../contexts/AuthContext";
import back from "../../images/back.svg";
import { US_Cities, US_States } from "../../utils/USList";
import { stat } from "fs";

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
  const [state, setState] = useState("New York");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [busy, setBusy] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();
  const { genJson, setGenJson, genList, setGenList } = useDatabase();

  async function creategeneral(e) {
    e.preventDefault();
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
      Zip: zip,
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

  function changeroute() {
    history.replace("/home");
  }

  return (
    <IonPage>
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <IonGrid>
          <h1>
            <IonRow className="home">
              <IonCol>
                <div>
                  <IonButton onClick={changeroute} color="light">
                    <IonIcon src={back}></IonIcon>
                  </IonButton>
                </div>{" "}
              </IonCol>
              <IonCol className="ion-align-self-center heading">
                General Info
              </IonCol>
<<<<<<< HEAD
              <IonCol className="ion-align-self-end">

              </IonCol>
            </IonRow>
          </h1>
        </IonGrid>

=======
              <IonCol className="ion-align-self-end"></IonCol>
            </IonRow>
          </h1>
        </IonGrid>
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4

        {genList.map((item, pos) => {
          return (
            <IonCard key={pos} onClick={async () => {
              changeEditStatus(genJson[item]);
              console.log("clicked!");
            }}>
              <IonCardHeader>
                <IonCardTitle>Name: {genJson[item]["Name"]}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Age: {genJson[item]["Age"]}</IonCardSubtitle>
                <IonCardSubtitle>
<<<<<<< HEAD
                  Age: {genJson[item]["Age"]}
                </IonCardSubtitle>
                <IonCardSubtitle>
=======
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4
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
<<<<<<< HEAD
                  Full Address: {genJson[item]["Str_address"] + ", " + genJson[item]["City"] + ", " + genJson[item]["State"] + ", " + genJson[item]["Zip"]}
                </IonCardSubtitle>

=======
                  Full Address:{" "}
                  {genJson[item]["Str_address"] +
                    ", " +
                    genJson[item]["City"] +
                    ", " +
                    genJson[item]["State"] +
                    ", " +
                    genJson[item]["Zip"]}
                </IonCardSubtitle>
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4
              </IonCardContent>
            </IonCard>
          );
        })}

<<<<<<< HEAD
<EditGeneralModal 
          show={editStatus}
          edit={editGeneral}
          name={setEditName}
          age={setEditAge}
          bgroup={setEditBloodgroup}
          height={setEditHeight}
          f_physician={setEditPhysician}
          staddress={setEditStr_address}
          city ={setEditCity}
          state={setEditState}
          zip={setEditZip}
          editName = {editName}
          editAge=  {editage}
          editbgroup = {editbgroup}
          editheight= {editheight}
          editphys= {editphys}
          editethinicity= {editethinicity}
          editaddress ={editstraddress}
          editcity ={editcity}
          editstate= {editstate}
          editzip = {editzip}/>

        {genList.length == 0 && <><IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add General Info
        </IonButton><IonModal isOpen={status}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={changestatus}>Cancel</IonButton>
                </IonButtons>
                <IonTitle>Add Info</IonTitle>
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
=======
        {genList.length == 0 && (
          <>
            <IonButton id="open-modal" expand="block" onClick={changestatus}>
              Add General Info
            </IonButton>
            <IonModal isOpen={status}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={changestatus}>Cancel</IonButton>
                  </IonButtons>
                  <IonTitle>Add Info</IonTitle>
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
                  <IonLabel position="stacked">
                    Family physician(if any)
                  </IonLabel>
                  <IonInput
                    ref={input}
                    type="text"
                    onIonChange={(e) => setFphysician(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Ethinicity</IonLabel>
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4

                  <IonInput
                    ref={input}
                    type="text"
                    onIonChange={(e) => setEthinicity(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Street Address</IonLabel>

                  <IonInput
                    ref={input}
                    type="text"
                    onIonChange={(e) => setAddress(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">State</IonLabel>
                  <IonSelect onIonChange={(e) => setState(e.target.value)}>
                    {US_States.map((item, pos) => {
                      return (
                        <IonSelectOption value={item}>{item}</IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">City</IonLabel>
                  <IonSelect onIonChange={(e) => setCity(e.target.value)}>
                    {US_Cities[state].map((item, pos) => {
                      return (
                        <IonSelectOption value={item}>{item}</IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">City</IonLabel>
                  <IonInput
                    ref={input}
                    type="text"
                    onIonChange={(e) => setCity(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Zip/Postal code</IonLabel>

<<<<<<< HEAD
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
         
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage></>
	 
	);
  }
  
  export default General;
  
=======
                  <IonInput
                    ref={input}
                    type="number"
                    onIonChange={(e) => setZip(e.target.value)}
                  />
                </IonItem>
              </IonContent>
            </IonModal>
          </>
        )}
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default General;
>>>>>>> 183482b1561d46dfc226201daa83ae941ca864c4
