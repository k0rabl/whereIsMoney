import { configureStore } from '@reduxjs/toolkit'

import authSlice from '../auth/store'
import alertSlice from '../components/alert/store'

export const reducer = {
  auth: authSlice,
  alert: alertSlice,
}

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
