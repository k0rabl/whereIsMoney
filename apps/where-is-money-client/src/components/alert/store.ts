import { createSlice } from '@reduxjs/toolkit'

import { AlertStore } from './model'

const initialState = {} as AlertStore

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setVisible: (_store, action) => ({
      isVisible: true,
      text: action.payload,
    }),
    setHide: () => ({
      isVisible: false,
      text: '',
    }),
  },
})

export const alertActions = alertSlice.actions

export default alertSlice.reducer
