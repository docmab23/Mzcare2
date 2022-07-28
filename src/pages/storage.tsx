import { configureStore } from '@reduxjs/toolkit'
import immunizationReducer from './database'; 

export default configureStore({
  reducer: {
    immunization:immunizationReducer
  },
})