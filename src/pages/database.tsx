import { createSlice } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, db } from '../firebase'
import { currentUserSlice } from './auth';

export const immunizationSlice = createSlice({
  name: 'immunization',
  initialState: {
    vaccine: "s"
  },
  reducers: {
    addVaccine:(state,action)=>{
        state.vaccine=action.payload
    }
  },
})

export const { addVaccine } = immunizationSlice.actions

export default immunizationSlice.reducer

export async function setImmunization(data: any) {
  const immunizationRef = doc(db, auth.currentUser?.uid + "/immunization")
  setDoc(immunizationRef, data)
}

export async function setMedication(data: any) {
  const medicationRef = doc(db, auth.currentUser?.uid + "/medication")
  setDoc(medicationRef, data)
}

export async function setICE(data: any) {
  const iceRef = doc(db, auth.currentUser?.uid + "/ice")
  setDoc(iceRef, data)
}

export async function setAllergy(data: any) {
  const allergyRef = doc(db, auth.currentUser?.uid + "/allergy")
  setDoc(allergyRef, data)
}

export async function setCondition(data: any) {
  const conditionRef = doc(db, auth.currentUser?.uid + "/condition")
  setDoc(conditionRef, data)
}

export async function setGeneral(data: any) {
  const generalRef = doc(db, auth.currentUser?.uid + "/general")
  setDoc(generalRef, data)
}

export async function updateGeneral(data: any) {
  const generalRef = doc(db, auth.currentUser?.uid + "/general")
  updateDoc(generalRef, data)
}
