import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    uid: ""
  },
  reducers: {
    changeUser:(state,action)=>{
        state.uid=action.payload
    }
  },
})

export const { changeUser } = currentUserSlice.actions

export default currentUserSlice.reducer