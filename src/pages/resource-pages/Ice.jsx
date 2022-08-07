import {
  IonContent,
  IonPage,
  IonButton,
  IonLoading,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";

import React, { useEffect, useRef, useState } from "react";
import FormTopBar from "../../components/FormTopBar";
import { useDatabase } from "../../contexts/DatabaseContext";
import { setICE } from "../database";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import AddICEModal from "../../modals/AddICEModal";
import EditICEModal from "../../modals/EditICEModal";
import { Redirect } from "react-router";

function Ice() {
  const input = useRef(null);
  const [status, setStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [iceName, setICEName] = useState("");
  const [editName, setEditName] = useState("");
  const [originalEditName, setOriginalEditName] = useState("");
  const [contact, setContact] = useState("");
  const [editContact, setEditContact] = useState("");
  const [busy, setBusy] = useState(false);
  const { iceJson, iceList, setICEJson, setICEList } = useDatabase();
  const { currentUser } = useAuth();

  function changestatus() {
    setStatus(!status);
  }

  function changeEditStatus(jsonToEdit) {
    setEditName(jsonToEdit["name"]);
    setOriginalEditName(jsonToEdit["name"]);
    setEditContact(jsonToEdit["number"]);
    setEditStatus(!status);
  }

  async function editICE(e) {
    e.preventDefault();
    const iceRef = doc(db, currentUser.uid + "/ice");
    const submitICEData = {};
    const iceData = {
      name: editName,
      number: editContact,
    };
    submitICEData[editName] = iceData;
    if (originalEditName === editName) {
      updateDoc(iceRef, submitICEData);
    } else {
      iceList.push(editName);
      for (let key in iceJson) {
        submitICEData[key] = iceJson[key];
      }
      setICEJson(submitICEData);
      setICEList(iceList);
      await setICE(submitICEData);
      await updateDoc(iceRef, {
        [originalEditName]: deleteField(),
      });
    }
    const iceLinks = [];
    await getDoc(iceRef).then((docSnap) => {
      if (docSnap.exists()) {
        const iceData = docSnap.data();
        for (let key in iceData) {
          iceLinks.push(key);
        }
        setICEList(iceLinks);
        setICEJson(iceData);
      }
    });
    setEditStatus(!editStatus);
  }

  async function deleteICE(e) {
    e.preventDefault();
    const iceRef = doc(db, currentUser.uid + "/ice");
    await updateDoc(iceRef, {
      [editName]: deleteField(),
    }).then(async () => {
      const iceLinks = [];
      getDoc(iceRef).then((docSnap) => {
        if (docSnap.exists()) {
          const iceData = docSnap.data();
          for (let key in iceData) {
            iceLinks.push(key);
          }
          setICEList(iceLinks);
          setICEJson(iceData);
        }
      });
    });
    setEditStatus(!editStatus);
  }

  async function createICE(e) {
    e.preventDefault();
    setBusy(true);
    const submitICEData = {};
    const iceData = {
      name: iceName,
      number: contact,
    };
    submitICEData[iceName] = iceData;
    iceList.push(iceName);
    for (let key in iceJson) {
      submitICEData[key] = iceJson[key];
    }
    setICEJson(submitICEData);
    setICEList(iceList);
    await setICE(submitICEData);
    setBusy(false);
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
        <h1>In Case of Emergency</h1>
        {iceList.map((item, pos) => {
          return (
            <IonCard
              key={item}
              onClick={async () => {
                changeEditStatus(iceJson[item]);
              }}
            >
              <IonCardHeader>
                <IonCardTitle>{iceJson[item]["name"]}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Number: {iceJson[item]["number"]}
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          );
        })}
        {iceList.length === 3 ? (
          <IonButton
            disabled={true}
            id="open-modal"
            expand="block"
            onClick={changestatus}
          >
            Add Contact
          </IonButton>
        ) : (
          <IonButton
            disabled={false}
            id="open-modal"
            expand="block"
            onClick={changestatus}
          >
            Add Contact
          </IonButton>
        )}
        <AddICEModal
          show={status}
          close={changestatus}
          create={createICE}
          name={setICEName}
          contact={setContact}
        ></AddICEModal>
        <EditICEModal
          show={editStatus}
          edit={editICE}
          delete={deleteICE}
          name={setEditName}
          contact={setEditContact}
          editName={editName}
          editContact={editContact}
        ></EditICEModal>
        <IonButton className="back-button" routerLink="/home">
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Ice;
