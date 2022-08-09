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
import AddGeneralModal from "../../modals/AddGeneralModal";

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
  const { currentUser } = useAuth();
  const history = useHistory();
  const { genJson, setGenJson, genList, setGenList } = useDatabase();
  const [editStatus, changeEditStatus] = useState(false);


  async function createGeneral(e) {
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
    submitGeneralData["General"] = generalData;
    genList.push("General");
    for (let key in genJson) {
      submitGeneralData[key] = genJson[key];
    }
    setGenJson(submitGeneralData);
    setGenList(genList);
    await setGeneral(submitGeneralData);
    setBusy(false);
    setStatus(!status);
  }

  function changeStatus() {
    setStatus(!status);
  }

  function changeroute() {
    history.replace("/home");
  }

  return (
    <IonPage>
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
              <IonCol className="ion-align-self-end"></IonCol>
            </IonRow>
          </h1>
        </IonGrid>

        {genList.map((item, pos) => {
          return (
            <IonCard key={pos} onClick={async () => {
              changeEditStatus(genJson[item]);
            }}>
              <IonCardHeader>
                <IonCardTitle>Name: {genJson[item]["Name"]}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>Age: {genJson[item]["Age"]}</IonCardSubtitle>
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
                  Full Address:{" "}
                  {genJson[item]["Str_address"] +
                    ", " +
                    genJson[item]["City"] +
                    ", " +
                    genJson[item]["State"] +
                    ", " +
                    genJson[item]["Zip"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}

        {genList.length == 0 && (
          <>
            <IonButton id="open-modal" expand="block" onClick={changeStatus}>
              Add General Info
            </IonButton>
            <AddGeneralModal show={status} changeStatus={changeStatus} create={createGeneral} setName={setName} setAge={setAge} setBgroup={setBgroup} setHeight={setHeight} setFphysician={setFphysician} setEthinicity={setEthinicity} setAddress={setAddress} setState={setState} setCity={setCity} setZip={setZip} state={state}/>
          </>
        )}
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default General;
