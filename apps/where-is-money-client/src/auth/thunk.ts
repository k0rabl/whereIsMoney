import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { alertActions } from '../components/alert/store'
import { setToken } from '../services/token'
import { IReqLogin, IReqRegistration } from './model'
import { userLoginService, userRegistartionService } from './services'

export const registartionUserThunk = createAsyncThunk(
  'users/registrationUser',
  async (payload: IReqRegistration, { dispatch }) => {
    try {
      const {
        data: { token, user },
      } = await userRegistartionService(payload)

      await setToken(token)
      dispatch(alertActions.setVisible('You are registrated!'))

      return user
    } catch (e) {
      const error = e as AxiosError

      dispatch(alertActions.setVisible(error.response.data))
    }
  },
)

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (payload: IReqLogin, { dispatch }) => {
    try {
      const {
        data: { token, user },
      } = await userLoginService(payload)

      await setToken(token)

      return user
    } catch (e) {
      const error = e as AxiosError

      dispatch(alertActions.setVisible(error.response.data))
    }
  },
)
