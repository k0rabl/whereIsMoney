import { AxiosResponse } from 'axios'

import { instance } from '../services/axios'
import { IReqLogin, IReqRegistration, IResLogin } from './model'

export const userLoginService = async (
  data: IReqLogin,
): Promise<AxiosResponse<IResLogin>> => {
  return await instance.post('/auth/login', data)
}

export const userRegistartionService = async (
  data: IReqRegistration,
): Promise<AxiosResponse<IResLogin>> => {
  return await instance.post('/auth/registration', data)
}

export const userLogoutService = async (): Promise<AxiosResponse> => {
  return await instance.post('/auth/logout')
}
