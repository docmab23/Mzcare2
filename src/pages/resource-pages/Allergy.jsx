import {
  IonContent,
  IonPage,
  IonButton,
  IonFooter,
  IonCard,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import FormTopBar from "../../components/FormTopBar";
import { setAllergy } from "../database";
import { useDatabase } from "../../contexts/DatabaseContext";
import AddAllergyModal from "../../modals/AddAllergyModal";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import EditAllergyModal from "../../modals/EditAllergyModal";
import BackButton from "../../components/Backbutton";

function Allergy() {
  const [status, setStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editAllergyName, setEditAllergyName] = useState("");
  const [originalEditAllergyName, setOriginalEditAllergyName] = useState("");
  const [allergyName, setAllergyName] = useState("");
  const [onsetDate, setDate] = useState("");
  const [editDate, setEditDate] = useState("");
  const [busy, setBusy] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const { allergyJson, allergyList, setAllergyJson, setAllergyList } =
    useDatabase();

  function changeEditStatus(jsonToEdit) {
    setEditAllergyName(jsonToEdit["allergyName"]);
    setOriginalEditAllergyName(jsonToEdit["allergyName"]);
    setEditDate(jsonToEdit["onsetDate"]);
    setEditStatus(!status);
  }

  async function updateAllergy(ref) {
    updateDoc(ref);
  }

  async function editAllergy(e) {
    e.preventDefault();
    const allergyRef = doc(db, currentUser.uid + "/allergy");
    const submitAllergyData = {};
    const allergyData = {
      allergyName: editAllergyName,
      onsetDate: editDate,
    };
    submitAllergyData[editAllergyName] = allergyData;
    if (originalEditAllergyName === editAllergyName) {
      updateDoc(allergyRef, submitAllergyData);
    } else {
      allergyList.push(editAllergyName);
      for (let key in allergyJson) {
        submitAllergyData[key] = allergyJson[key];
      }
      setAllergyJson(submitAllergyData);
      setAllergyList(allergyList);
      await setAllergy(submitAllergyData);
      await updateDoc(allergyRef, {
        [originalEditAllergyName]: deleteField(),
      });
    }
    await getDoc(allergyRef).then((docSnap) => {
      const allergyLinks = [];
      if (docSnap.exists()) {
        const allergyData = docSnap.data();
        for (let key in allergyData) {
          allergyLinks.push(key);
        }
        setAllergyList(allergyLinks);
        setAllergyJson(allergyData);
      }
    });
    setEditStatus(!editStatus);
  }

  async function deleteAllergy(e) {
    e.preventDefault();
    const allergyRef = doc(db, currentUser.uid + "/allergy");
    await updateDoc(allergyRef, {
      [editAllergyName]: deleteField(),
    }).then(async () => {
      const allergyLinks = [];
      getDoc(allergyRef).then((docSnap) => {
        if (docSnap.exists()) {
          const allergyData = docSnap.data();
          for (let key in allergyData) {
            allergyLinks.push(key);
          }
          setAllergyList(allergyLinks);
          setAllergyJson(allergyData);
        }
      });
    });
    setEditStatus(!editStatus);
  }

  async function createallergy(e) {
    e.preventDefault();
    setBusy(true);
    const submitAllergyData = {};
    const allergyData = {
      allergyName: allergyName,
      onsetDate: onsetDate,
    };
    submitAllergyData[allergyName] = allergyData;
    allergyList.push(allergyName);
    for (let key in allergyJson) {
      submitAllergyData[key] = allergyJson[key];
    }
    setAllergyJson(submitAllergyData);
    setAllergyList(allergyList);
    await setAllergy(submitAllergyData);
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
        <BackButton page="Allergy"/>
        {allergyList.map((item, pos) => {
          return (
            <IonCard
              key={pos}
              onClick={async () => {
                changeEditStatus(allergyJson[item]);
              }}
            >
              <IonCardHeader>
                <IonCardTitle>{allergyJson[item]["allergyName"]}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Onset Date: {allergyJson[item]["onsetDate"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
        <IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add Allergy
        </IonButton>
        <AddAllergyModal
          show={status}
          changestatus={changestatus}
          createallergy={createallergy}
          setAllergyName={setAllergyName}
          setDate={setDate}
        ></AddAllergyModal>
        <EditAllergyModal
          show={editStatus}
          edit={editAllergy}
          delete={deleteAllergy}
          name={setEditAllergyName}
          date={setEditDate}
          editName={editAllergyName}
          editDate={editDate}
        ></EditAllergyModal>
       
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default Allergy;
