/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'form',
  initialState: [],
  reducers: {
    addCategory: (state, action) => {
      const addCategory = {
        name: action.payload.Addname,
        price: action.payload.Addprice,
        kind: action.payload.Addkind,
      }
      state.push(addCategory)
    },
  },
})

export const { addCategory } = formSlice.actions
export default formSlice.reducer
