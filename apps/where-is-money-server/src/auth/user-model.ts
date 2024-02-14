export interface IUser {
  email: string
  userName: string

  password: string
  salt: string

  items: string[]
  categories: string[]
  wallets: string[]
}
