import { configureStore } from '@reduxjs/toolkit'
import langReducer from './langSlice'

export default configureStore({
  reducer: {
      lang:langReducer
  },
})