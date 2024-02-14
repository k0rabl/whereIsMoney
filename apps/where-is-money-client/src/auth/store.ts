import { createSlice } from '@reduxjs/toolkit'

import { RequestType } from '../services/loader'
import { IAuthStore } from './model'
import { loginUserThunk, registartionUserThunk } from './thunk'

const initialState = {} as IAuthStore

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registartionUserThunk.pending, state => {
        state.registrationReqStatus = RequestType.LOADING
      })
      .addCase(registartionUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.registrationReqStatus = RequestType.NONE
      })
      .addCase(registartionUserThunk.rejected, state => {
        state.registrationReqStatus = RequestType.ERROR
      })

      .addCase(loginUserThunk.pending, state => {
        state.loginReqStatus = RequestType.LOADING
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload
        state.loginReqStatus = RequestType.NONE
      })
      .addCase(loginUserThunk.rejected, state => {
        state.loginReqStatus = RequestType.ERROR
      })
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
