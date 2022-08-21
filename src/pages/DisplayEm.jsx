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
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonRow,
  IonCol,
  IonGrid,
  IonCardContent,
  IonSubTitle,
  useIonViewDidEnter,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import FormTopBar from "../components/FormTopBar";
import { toast } from "../toast";
import { useDatabase } from "../contexts/DatabaseContext";
import { errors, hideTabBar } from "../utils/Utils";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import Geocode from "react-geocode";

// import "./Em.css";
import General from "./resource-pages/General";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router";

function DisplayEm() {
  var show_ = false;
  useIonViewDidEnter(() => {
    hideTabBar();
  });

  useEffect(() => {
    getData();
  }, []);

  const location = useLocation();
  var uid = location.pathname;
  uid = uid.split("/").pop();
  const [address, setAddress] = useState([]);
  const [immunizationJson, setImmunizationJson] = useState("")
  const [immunizationList, setImmunizationList] = useState([])
  const [allergyJson, setAllergyJson] = useState("")
  const [allergyList, setAllergyList] = useState([])
  const [iceJson, setICEJson] = useState("")
  const [iceList, setICEList] = useState([])
  const [conditionJson, setConditionJson] = useState("")
  const [conditionList, setConditionList] = useState([])
  const [genJson, setGenJson] = useState("")
  const [genList, setGenList] = useState([])

  function getData() {
    getImmunizations();
    getAllergy();
    getICE();
    getCondition();
    getGeneral();
  }

  function getImmunizations() {
    const immunizationRef = doc(db, uid + "/immunization");
    const immuneList = []
    getDoc(immunizationRef).then((docSnap) => {
        if (docSnap.exists()) {
            const immunizationData = docSnap.data();
            for (let key in immunizationData) {
                immuneList.push(key)
            }
            setImmunizationJson(immunizationData);
            setImmunizationList(immuneList);
        }
    })
  }

  function getICE() {
    const iceRef = doc(db, uid + "/ice");
    const iceList = []
    getDoc(iceRef).then((docSnap) => {
        if (docSnap.exists()) {
            const iceData = docSnap.data();
            for (let key in iceData) {
                iceList.push(key)
            }
            setICEJson(iceData);
            setICEList(iceList);
        }
    })
  }

  function getAllergy() {
    const allergyRef = doc(db, uid + "/allergy");
    const allergyList = []
    getDoc(allergyRef).then((docSnap) => {
        if (docSnap.exists()) {
            const allergyData = docSnap.data();
            for (let key in allergyData) {
                allergyList.push(key)
            }
            setAllergyJson(allergyData);
            setAllergyList(allergyList);
        }
    })
  }

  function getCondition() {
    const conditionRef = doc(db, uid + "/condition");
    const conditionList = []
    getDoc(conditionRef).then((docSnap) => {
        if (docSnap.exists()) {
            const conditionData = docSnap.data();
            for (let key in conditionData) {
                conditionList.push(key)
            }
            setConditionJson(conditionData);
            setConditionList(conditionList);
        }
    })
  }

  function getGeneral() {
    const generalRef = doc(db, uid + "/general");
    const generalList = []
    getDoc(generalRef).then((docSnap) => {
        if (docSnap.exists()) {
            const generalData = docSnap.data();
            for (let key in generalData) {
                generalList.push(key)
            }
            setGenJson(generalData);
            setGenList(generalList);
        }
    })
  }

  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude.toString();
      const long = position.coords.longitude.toString();
      setAddress([lat, long]);
    } catch (e) {
      toast(e);
    }
  };

  async function Send_Sms(number, pos_) {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `http://mzcare2.herokuapp.com/api/messages?to="${number}"&body="There's an emergency at:"${pos_}""`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  async function Sms_Ice() {
    iceList.map((item, pos) => {
      const phone_no = iceJson[item]["number"];
      getLocation().then(Send_Sms(phone_no, address));
    });
  }

  if (iceList.length != 0) {
    Sms_Ice();
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <FormTopBar />
        {"\u00a0\u00a0\u00a0"}
        <h1> {"\u00a0\u00a0\u00a0"}</h1>
        <h1> {"\u00a0\u00a0\u00a0"}</h1>
        <IonTitle align="center" color="primary">
          MzCare Emergency Profile{" "}
        </IonTitle>
        <IonCard>
          <IonCardContent>
            {genList.map((item, pos) => {
              return (
                <IonGrid>
                  <IonRow key={pos}>
                    <IonCol>
                      <IonText color="primary">
                        Name: {genJson[item]["Name"]}
                      </IonText>
                    </IonCol>
                    <IonCol>
                      <IonText color="primary">Age</IonText>:{" "}
                      {genJson[item]["Age"]}
                    </IonCol>
                    <IonCol>
                      <IonText color="primary">Blood Group</IonText>:{" "}
                      {genJson[item]["Bloodgroup"]}
                    </IonCol>
                    <IonCol>
                      <IonText color="primary">Full Address</IonText>:{" "}
                      {genJson[item]["Str_address"] +
                        ", " +
                        genJson[item]["City"] +
                        ", " +
                        genJson[item]["State"] +
                        ", " +
                        genJson[item]["Zip"]}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              );
            })}
          </IonCardContent>
        </IonCard>
        <h2>ICE contacts</h2>
        <IonCard>
          <IonCardContent>
            {iceList.map((item, pos) => {
              return (
                <IonGrid>
                  <IonRow key={pos}>
                    <IonCol>
                      <IonText color="primary" font="bold">
                        Contact Name:
                      </IonText>
                      <div>{iceJson[item]["name"]}</div>
                    </IonCol>
                    <IonCol>
                      <IonText color="primary" font="bold">
                        Contact No:
                      </IonText>
                      <div>{iceJson[item]["number"]}</div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              );
            })}
          </IonCardContent>
        </IonCard>
        <h2>Allergies</h2>
        <IonCard>
          <IonCardContent>
            {allergyList.map((item, pos) => {
              return (
                <IonGrid key={pos}>
                  <IonRow>
                    <IonText color="primary">Source:</IonText>
                    {allergyJson[item]["allergyName"]}
                  </IonRow>
                </IonGrid>
              );
            })}
          </IonCardContent>
        </IonCard>

        <h2>Immunizations</h2>
        <IonCard>
          <IonCardContent>
            {immunizationList.map((item, pos) => {
              return (
                <IonGrid key={pos}>
                  <IonRow>{immunizationJson[item]["vaccineName"]}</IonRow>
                </IonGrid>
              );
            })}
          </IonCardContent>
        </IonCard>

        <h2>Conditions</h2>
        <IonCard>
          <IonCardContent>
            {conditionList.map((item, pos) => {
              return (
                <IonGrid key={pos}>
                  <IonRow>{conditionJson[item]["conditionName"]}</IonRow>
                </IonGrid>
              );
            })}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default DisplayEm;
