import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'
import citiesListReducer from './citiesListSlice'

export default configureStore({
  reducer: {
      settings:settingsReducer,
      cities:citiesListReducer
  },
})