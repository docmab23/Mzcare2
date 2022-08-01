import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";


const DatabaseContext = React.createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const { currentUser } = useAuth();
  const [immunizationJson, setImmunizationJson] = useState("")
  const [immunizationList, setImmunizationList] = useState([])
  const [allergyJson, setAllergyJson] = useState("")
  const [allergyList, setAllergyList] = useState([])
  const [iceJson, setICEJson] = useState("")
  const [iceList, setICEList] = useState([])
  const [genJson, setGenJson] = useState("")
  const [genList, setGenList] = useState([])
  

  useEffect(() => {
    if (currentUser != null) {
        getData();
    }
  }, [currentUser]);


  function getData() {
    getImmunizations();
    getAllergy();
    getICE();
    getgeneral();
  }

  function getImmunizations() {
    const immunizationRef = doc(db, currentUser.uid + "/immunization");
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
    const iceRef = doc(db, currentUser.uid + "/ice");
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
    const allergyRef = doc(db, currentUser.uid + "/allergy");
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

  function getgeneral() {
    const generalRef = doc(db, currentUser.uid + "/general");
    const generalList = []
    getDoc(generalRef).then((docSnap) => {
        if (docSnap.exists()) {
            const generalData = docSnap.data();
            for (let key in generalData) {
                generalList.push(key)
            }
            setAllergyJson(generalData);
            setAllergyList(generalList);
        }
    })
  }



  const value = {
   immunizationJson,
   setImmunizationJson,
   immunizationList,
   setImmunizationList,
   allergyJson,
   setAllergyJson,
   allergyList,
   setAllergyList,
   iceJson,
   setICEJson,
   iceList,
   setICEList,
   genJson,
   setGenJson,
   genList,
   setGenList

  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}