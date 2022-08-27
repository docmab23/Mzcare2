import {
  IonContent,
  IonPage,
  IonText,
  IonCard,
  IonRow,
  IonCol,
  IonGrid,
  IonCardContent,
  useIonViewDidEnter,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { toast } from "../toast";

import { hideTabBar } from "../utils/Utils";
import { Geolocation } from "@ionic-native/geolocation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router";
import FormTopBarW from "../components/FormTopBarW";

function DisplayEm() {
  var show_ = false;
  useIonViewDidEnter(() => {
    hideTabBar();
  });

  const location = useLocation();
  var uid = location.pathname;
  uid = uid.split("/").pop();
  const [address, setAddress] = useState("");
  const [immunizationJson, setImmunizationJson] = useState("")
  const [loading, setLoading] = useState(true)
  const [immunizationList, setImmunizationList] = useState([])
  const [allergyJson, setAllergyJson] = useState("")
  const [allergyList, setAllergyList] = useState([])
  const [iceJson, setICEJson] = useState("")
  const [iceList, setICEList] = useState([])
  const [conditionJson, setConditionJson] = useState("")
  const [conditionList, setConditionList] = useState([])
  const [genJson, setGenJson] = useState("")
  const [genList, setGenList] = useState([])
  const [count, setCount] = useState(0)
  var from_number = +17408753450; // store in .env

  useEffect(() => {
    getData(uid);
  }, [location]);

  async function getData(uid) {
     getICE(uid);
     getImmunizations(uid);
     getAllergy(uid);
     getCondition(uid);
     getGeneral(uid);
    console.log("ojfoe")
  }

  async function getImmunizations(uid) {
    const immunizationRef = doc(db, uid + "/immunization");
    const immuneList = []
    await getDoc(immunizationRef).then((docSnap) => {
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

  async function getICE(uid) {
    const iceRef = doc(db, uid + "/ice");
    const iceList = []
    await getDoc(iceRef).then((docSnap) => {
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

  async function getAllergy(uid) {
    const allergyRef = doc(db, uid + "/allergy");
    const allergyList = []
    await getDoc(allergyRef).then((docSnap) => {
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

  async function getCondition(uid) {
    const conditionRef = doc(db, uid + "/condition");
    const conditionList = []
    await getDoc(conditionRef).then((docSnap) => {
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

  async function getGeneral(uid) {
    console.log("heree")
    console.log(uid)
    const generalRef = doc(db, uid + "/general");
    const generalList = []
    await getDoc(generalRef).then((docSnap) => {
        if (docSnap.exists()) {
            const generalData = docSnap.data();
            for (let key in generalData) {
                generalList.push(key)
            }
            setGenJson(generalData);
            setGenList(generalList);
            console.log("vnkf")
        }
    })
  }

  useEffect(() => {
    Sms_Ice();
  }, [address]);

  async function getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude.toString();
      const long = position.coords.longitude.toString();
      setAddress([lat, long]);
    } catch (e) {
      toast(e);
    }
    return "ok"
  };

  async function Send_Sms(number, pos_) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','https://localhost:3000');
  
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    if (address!== undefined && address !== "" && count === 0) {
      setCount(1);
      fetch(
        `https://mzcare2.herokuapp.com/api/messages?from_number=${from_number}&body="There's an emergency at ${pos_}"&to=${number}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  }

  async function Sms_Ice() {
    iceList.map((item, pos) => {
      const phone_no = iceJson[item]["number"];
      Send_Sms(phone_no, address);
    });
  }

  // if (loading) {
  //   return (
  //     <div>
  //       Nice
  //     </div>
  //   )
  // }

  return (
    <IonPage>
    <IonContent className="ion-padding" color="primary">
      <FormTopBarW />
  <IonGrid align="center" color="primary">
  <IonRow>
        <IonText>MzCare Emergency Profile{" "}</IonText>
  </IonRow>
      </IonGrid>
      {"\u00a0\u00a0\u00a0"}
      <h1> {"\u00a0\u00a0\u00a0"}</h1>
      <h1> {"\u00a0\u00a0\u00a0"}</h1>
      
      <IonCard>
        <IonCardContent>
          {genList.map((item, pos) => {
            return (
          
                  <>
                   <IonRow><IonText color="primary">
                      Name {"\u00a0\u00a0"}
                    </IonText>
        <IonText >{genJson[item]["Name"]}</IonText></IonRow>
        <IonRow>
        <IonText color="primary">
                      Age {"\u00a0\u00a0"}
                    </IonText>
        <IonText >{genJson[item]["Age"]}</IonText>
        </IonRow>
        <IonRow>
        <IonText color="primary">
                      Blood Group {"\u00a0\u00a0"}
                    </IonText>
        <IonText >{genJson[item]["Bloodgroup"]}</IonText>
        </IonRow>
        <IonRow>
        <IonText color="primary">
                      Full Address {"\u00a0\u00a0"}
                    </IonText>
        <IonText> {genJson[item]["Str_address"] +
                      ", " +
                      genJson[item]["City"] +
                      ", " +
                      genJson[item]["State"] +
                      ", " +
                      genJson[item]["Zip"]}</IonText>
          </IonRow>
    
             </>
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
                      Name  {"\u00a0\u00a0"}
                    </IonText>
                    <div>{iceJson[item]["name"]}</div>
                  </IonCol>
                  <IonCol>
                    <IonText color="primary" font="bold">
                     Contact No {"\u00a0\u00a0"}
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
                  <IonText color="primary">Source {"\u00a0\u00a0"}</IonText>
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
                <IonRow>
                  {immunizationJson[item]["vaccineName"]}
                </IonRow>
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
                <IonRow>
                  {conditionJson[item]["conditionName"]}
                </IonRow>
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
