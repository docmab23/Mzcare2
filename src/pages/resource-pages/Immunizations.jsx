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
  IonModal,
  IonButtons,
} from "@ionic/react";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";

import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormTopBar from "../../components/FormTopBar";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";
import { db } from "../../firebase";
import AddImmunizationModal from "../../modals/AddImmunizationModal";
import EditImmunizationModal from "../../modals/EditImmunizatioModal";
import { setImmunization } from "../database";

function Immunizations() {
  const [status, setStatus] = useState(false);
  const input = useRef(null);
  const [vaccineName, setVaccineName] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editName, setEditName] = useState("");
  const [originalEditName, setOriginalEditName] = useState("");
  const [editAdminister, setEditdAminister] = useState("");
  const [editExpiry, setEditExpiry] = useState("");
  const [administer, setAdminister] = useState("");
  const [expiry, setExpiry] = useState("");
  const [busy, setBusy] = useState(false);
  const { currentUser } = useAuth();
  const {
    immunizationJson,
    immunizationList,
    setImmunizationJson,
    setImmunizationList,
  } = useDatabase();

  function changestatus() {
    setStatus(!status);
  }

  function changeEditStatus(jsonToEdit) {
    setEditName(jsonToEdit["vaccineName"]);
    setOriginalEditName(jsonToEdit["vaccineName"]);
    setEditdAminister(jsonToEdit["administerDate"]);
    setEditExpiry(jsonToEdit["expiryDate"]);
    setEditStatus(!status);
  }

  async function editImmunization(e) {
    e.preventDefault();
    const immunizationRef = doc(db, currentUser.uid + "/immunization");
    const submitImmunizationData = {};
    const immunizationData = {
      vaccineName: editName,
      administerDate: editAdminister,
      expiryDate: editExpiry
    };
    submitImmunizationData[editName] = immunizationData;
    immunizationList.push(editName);
    for (let key in immunizationJson) {
      submitImmunizationData[key] = immunizationJson[key];
    }
    setImmunizationJson(submitImmunizationData);
    setImmunizationList(immunizationList);
    await setImmunization(submitImmunizationData);
    await updateDoc(immunizationRef, {
      [originalEditName]: deleteField(),
    }).then(async () => {
      const immunizationLinks = [];
      await getDoc(immunizationRef).then((docSnap) => {
        if (docSnap.exists()) {
          const immunizationData = docSnap.data();
          for (let key in immunizationData) {
            immunizationLinks.push(key);
          }
          setImmunizationList(immunizationLinks);
          setImmunizationJson(immunizationData);
        }
      });
    });
    setEditStatus(!editStatus);
  }

  async function deleteImmunization(e) {
    e.preventDefault();
    const immunizationRef = doc(db, currentUser.uid + "/immunization");
    await updateDoc(immunizationRef, {
      [editName]: deleteField(),
    }).then(async () => {
      const immunizationLinks = [];
      getDoc(immunizationRef).then((docSnap) => {
        if (docSnap.exists()) {
          const immunizationData = docSnap.data();
          for (let key in immunizationData) {
            immunizationLinks.push(key);
          }
          setImmunizationList(immunizationLinks);
          setImmunizationJson(immunizationData);
        }
      });
    });
    setEditStatus(!editStatus);
  }

  async function createImmunization(e) {
    e.preventDefault();
    setBusy(true);
    const submitVaccineData = {};
    const vaccineData = {
      vaccineName: vaccineName,
      administerDate: administer,
      expiryDate: expiry,
    };
    submitVaccineData[vaccineName] = vaccineData;
    immunizationList.push(vaccineName);
    for (let key in immunizationJson) {
      submitVaccineData[key] = immunizationJson[key];
    }
    setImmunizationJson(submitVaccineData);
    setImmunizationList(immunizationList);
    await setImmunization(submitVaccineData);
    setBusy(false);
    setStatus(!status);
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <h1>Immunizations</h1>
        {immunizationList.map((item, pos) => {
          return (
            <IonCard key={pos} onClick={async () => {
              changeEditStatus(immunizationJson[item]);
            }}>
              <IonCardHeader>
                <IonCardTitle>
                  {immunizationJson[item]["vaccineName"]}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Administered Date: {immunizationJson[item]["administerDate"]}
                </IonCardSubtitle>
                <IonCardSubtitle>
                  Expiry date: {immunizationJson[item]["expiryDate"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
        <IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add Immunizations
        </IonButton>

        <AddImmunizationModal show={status} changestatus={changestatus} create={createImmunization} vaccine={setVaccineName} administer={setAdminister} expiry={setExpiry}></AddImmunizationModal>
        <EditImmunizationModal show={editStatus} edit={editImmunization} delete={deleteImmunization} name={setEditName} administer={setEditdAminister} expiry={setEditExpiry} editName={editName} editAdminister={editAdminister} editExpiry={editExpiry}></EditImmunizationModal>

        <IonButton className="back-button" routerLink="/home">
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Immunizations;
