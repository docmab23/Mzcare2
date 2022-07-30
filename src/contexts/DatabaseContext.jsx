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
  

  useEffect(() => {
    if (currentUser != null) {
        getData();
    }
  }, [currentUser]);


  function getData() {
    getImmunizations();
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



  const value = {
   immunizationJson,
   setImmunizationJson,
   immunizationList,
   setImmunizationList
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
