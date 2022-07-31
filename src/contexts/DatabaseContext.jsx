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
  

  useEffect(() => {
    if (currentUser != null) {
        getData();
    }
  }, [currentUser]);


  function getData() {
    getImmunizations();
    getAllergy();
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



  const value = {
   immunizationJson,
   setImmunizationJson,
   immunizationList,
   setImmunizationList,
   allergyJson,
   setAllergyJson,
   allergyList,
   setAllergyList
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}