import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    lang: "en",
    temp:"c"
  },
  reducers: {
    changeLang: (state,action) => {
      state.lang =action.payload
    },
    changeTemp: (state,action) => {
      state.temp =action.payload
    },
  },
})


export const {changeLang,changeTemp} = settingsSlice.actions

export default settingsSlice.reducer