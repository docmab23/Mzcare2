import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app" ; 


let immune_ref = firebase.database().ref("Immunizations");


useEffect(() => {
    function getData() {


        let immuneRef = firebase.database().ref('arts/')

        return immuneRef.once('value', (snapshot) => {

            const data = snapshot.val()

            dispatch({type: 'GET_ARTS', payload: data})
        })

    }
    getData()

},[dispatch])
