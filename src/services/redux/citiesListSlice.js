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
      let removed_index=state.list.findIndex(x=>x.lat===action.payload.lat)
        state.list.splice(removed_index,1)
      },
  },
})


export const {addCity,removeCity,setCities} = citiesListSlice.actions

export default citiesListSlice.reducer