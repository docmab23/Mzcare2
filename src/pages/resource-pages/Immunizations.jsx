import {
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCol,
  IonCardSubtitle,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonModal,
  IonRow,
  IonGrid,
  IonButtons,
} from "@ionic/react";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router";

import React, { useRef, useState } from "react";
import FormTopBar from "../../components/FormTopBar";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";
import { db } from "../../firebase";
import AddImmunizationModal from "../../modals/AddImmunizationModal";
import EditImmunizationModal from "../../modals/EditImmunizatioModal";
import { setImmunization } from "../database";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./Immunizations.css";
import back from "../../images/back.svg";

function Immunizations() {
  const history = useHistory();
  const [status, setStatus] = useState(false);
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

  function changeroute() {
    history.replace("/home");
  }

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
      expiryDate: editExpiry,
    };
    submitImmunizationData[editName] = immunizationData;
    if (originalEditName === editName) {
      updateDoc(immunizationRef, submitImmunizationData);
    } else {
      immunizationList.push(editName);
      for (let key in immunizationJson) {
        submitImmunizationData[key] = immunizationJson[key];
      }
      setImmunizationJson(submitImmunizationData);
      setImmunizationList(immunizationList);
      await setImmunization(submitImmunizationData);
      await updateDoc(immunizationRef, {
        [originalEditName]: deleteField(),
      });
    }
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
        <div>
          <FormTopBar />
        </div>
        <h1>{"\u00a0\u00a0\u00a0"} </h1>
        <IonGrid>
        <h1>
          <IonRow>
            <IonCol className="ion-align-self-start">
              <div>
                <IonIcon slot="icon-only" src={back} name="home"></IonIcon>
              </div>{" "}
            </IonCol>
            <IonCol className="ion-align-self-center heading">
              Immunizations
            </IonCol>
            <IonCol className="ion-align-self-end">
              
            </IonCol>
          </IonRow>
          </h1>
        </IonGrid>
        {immunizationList.map((item, pos) => {
          return (
            <IonCard
              key={pos}
              onClick={async () => {
                changeEditStatus(immunizationJson[item]);
              }}
            >
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
        <AddImmunizationModal
          show={status}
          changestatus={changestatus}
          create={createImmunization}
          vaccine={setVaccineName}
          administer={setAdminister}
          expiry={setExpiry}
        ></AddImmunizationModal>
        <EditImmunizationModal
          show={editStatus}
          edit={editImmunization}
          delete={deleteImmunization}
          name={setEditName}
          administer={setEditdAminister}
          expiry={setEditExpiry}
          editName={editName}
          editAdminister={editAdminister}
          editExpiry={editExpiry}
        ></EditImmunizationModal>
      </IonContent>
    </IonPage>
  );
}

export default Immunizations;
