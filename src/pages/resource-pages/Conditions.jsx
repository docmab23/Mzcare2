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

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FormTopBar from "../../components/FormTopBar";
import { setCondition } from "../database";
import { useDatabase } from "../../contexts/DatabaseContext";
import AddConditionModal from "../../modals/AddConditionModal";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import EditConditionModal from "../../modals/EditConditionModal";
import BackButton from "../../components/Backbutton";

function Condition() {
  const [status, setStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editConditionName, setEditConditionName] = useState("");
  const [originalEditConditionName, setOriginalEditConditionName] =
    useState("");
  const [conditionName, setConditionName] = useState("");
  const [conditionStatus, setConditionStatus] = useState("");
  const [editConditionStatus, setEditConditionStatus] = useState("");
  const { currentUser } = useAuth();
  const { conditionJson, conditionList, setConditionJson, setConditionList } =
    useDatabase();

  function changeEditStatus(jsonToEdit) {
    setEditConditionName(jsonToEdit["conditionName"]);
    setOriginalEditConditionName(jsonToEdit["conditionName"]);
    setEditConditionStatus(jsonToEdit["status"]);
    setEditStatus(!status);
  }

  async function editCondition(e) {
    e.preventDefault();
    const conditionRef = doc(db, currentUser.uid + "/condition");
    const submitConditionData = {};
    const conditionData = {
      conditionName: editConditionName,
      status: editConditionStatus,
    };
    submitConditionData[editConditionName] = conditionData;
    if (originalEditConditionName === editConditionName) {
      updateDoc(conditionRef, submitConditionData);
    } else {
      conditionList.push(editConditionName);
      for (let key in conditionJson) {
        submitConditionData[key] = conditionJson[key];
      }
      setConditionJson(submitConditionData);
      setConditionList(conditionList);
      await setCondition(submitConditionData);
      await updateDoc(conditionRef, {
        [originalEditConditionName]: deleteField(),
      });
    }
    const conditionLinks = [];
    await getDoc(conditionRef).then((docSnap) => {
      if (docSnap.exists()) {
        const conditionData = docSnap.data();
        for (let key in conditionData) {
          conditionLinks.push(key);
        }
        setConditionList(conditionLinks);
        setConditionJson(conditionData);
      }
    });
    setEditStatus(!editStatus);
  }

  async function deleteCondition(e) {
    e.preventDefault();
    const conditionRef = doc(db, currentUser.uid + "/condition");
    await updateDoc(conditionRef, {
      [editConditionName]: deleteField(),
    }).then(async () => {
      const conditionLinks = [];
      getDoc(conditionRef).then((docSnap) => {
        if (docSnap.exists()) {
          const conditionData = docSnap.data();
          for (let key in conditionData) {
            conditionLinks.push(key);
          }
          setConditionList(conditionLinks);
          setConditionJson(conditionData);
        }
      });
    });
    setEditStatus(!editStatus);
  }

  async function createCondition(e) {
    e.preventDefault();
    const submitConditionData = {};
    const conditionData = {
      conditionName: conditionName,
      status: conditionStatus,
    };
    submitConditionData[conditionName] = conditionData;
    conditionList.push(conditionName);
    for (let key in conditionJson) {
      submitConditionData[key] = conditionJson[key];
    }
    setConditionJson(submitConditionData);
    setConditionList(conditionList);
    await setCondition(submitConditionData);
    setStatus(!status);
  }

  function changestatus() {
    setStatus(!status);
  }

  if (currentUser === null) {
    return (<Redirect to="/login"/>)
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <BackButton page="Conditions"/>
        {conditionList.map((item, pos) => {
          return (
            <IonCard
              key={pos}
              onClick={async () => {
                changeEditStatus(conditionJson[item]);
              }}
            >
              <IonCardHeader>
                <IonCardTitle>
                  {conditionJson[item]["conditionName"]}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Status: {conditionJson[item]["status"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
        <IonButton id="open-modal" expand="block" onClick={changestatus}>
          Add Condition
        </IonButton>
        <AddConditionModal
          show={status}
          changestatus={changestatus}
          createCondition={createCondition}
          setConditionName={setConditionName}
          setConditionStatus={setConditionStatus}
        ></AddConditionModal>
        <EditConditionModal
          show={editStatus}
          edit={editCondition}
          delete={deleteCondition}
          name={setEditConditionName}
          status={setEditConditionStatus}
          editName={editConditionName}
          editStatus={editConditionStatus}
        ></EditConditionModal>
       
      </IonContent>
      <IonFooter></IonFooter>
    </IonPage>
  );
}

export default Condition;
