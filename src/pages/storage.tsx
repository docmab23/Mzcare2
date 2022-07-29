import { configureStore } from '@reduxjs/toolkit'
import immunizationReducer from './database'; 
import currentUserReducer from './auth'

export default configureStore({
  reducer: {
    immunization:immunizationReducer,
    currentUser: currentUserReducer
  },
})