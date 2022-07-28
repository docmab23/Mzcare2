import { createSlice } from '@reduxjs/toolkit'

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