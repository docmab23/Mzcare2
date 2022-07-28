import { createSlice } from '@reduxjs/toolkit'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export const immunizationSlice = createSlice({
  name: 'immunization',
  initialState: {
    vaccine: "police"
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
