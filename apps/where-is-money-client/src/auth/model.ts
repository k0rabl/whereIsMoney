import { RequestType } from '../services/loader'

export interface IUser {
  id: string
  email: string
  userName: string

  password: string

  items: string[]
  categories: string[]
  wallets: string[]
}

export interface IAuthStore {
  user: IUser

  registrationReqStatus: RequestType
  loginReqStatus: RequestType
}

export interface IReqRegistration {
  email: string
  userName: string
  password: string
}

export interface IReqLogin {
  email: string
  password: string
}

export interface IResLogin {
  user: IUser
  token: string
}
