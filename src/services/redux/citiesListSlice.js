import { createSlice } from '@reduxjs/toolkit'

export const citiesListSlice = createSlice({
  name: 'my_cities',
  initialState: {
    list:  []
    },
  reducers: {
    setCities:(state,action) => {
        state.list=action.payload
      },

    addCity: (state,action) => {
      state.list.push(action.payload)
    },
    removeCity: (state,action) => {
        state.list.push(action.payload)
      },
  },
})


export const {addCity,removeCity,setCities} = citiesListSlice.actions

export default citiesListSlice.reducer