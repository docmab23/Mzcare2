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
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonButtons,
  IonModal,
} from "@ionic/react";

import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormTopBar from "../../components/FormTopBar";
import { useDatabase } from "../../contexts/DatabaseContext";
import { setICE } from "../database";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

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
  const [query, setQuery] = useState("");
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
    iceList.push(editName);
    for (let key in iceJson) {
      submitICEData[key] = iceJson[key];
    }
    setICEJson(submitICEData);
    setICEList(iceList);
    await setICE(submitICEData);
    await updateDoc(iceRef, {
      [originalEditName]: deleteField(),
    }).then(async () => {
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

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <h1>In Case of Emergency</h1>
        {iceList
          .filter((item) => {
            if (query === "") return item;
            else if (
              iceJson[item]["name"].toLowerCase().includes(query.toLowerCase())
            )
              return item;
          })
          .map((item, pos) => {
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
        <IonModal isOpen={status}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={changestatus}>Cancel</IonButton>
              </IonButtons>
              <IonTitle> Add Contact Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={createICE}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Contact Name</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setICEName(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Number</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setContact(e.target.value)}
              />
            </IonItem>
          </IonContent>
        </IonModal>

        <IonModal isOpen={editStatus}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={editICE}>Save</IonButton>
              </IonButtons>
              <IonTitle> Edit Contact Details </IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={deleteICE}>
                  Delete
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Contact Name</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setEditName(e.target.value)}
                value={editName}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contact Number</IonLabel>
              <IonInput
                ref={input}
                type="text"
                onIonChange={(e) => setEditContact(e.target.value)}
                value={editContact}
              />
            </IonItem>
          </IonContent>
        </IonModal>
        <IonButton className="back-button" routerLink="/home">
          Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Ice;
