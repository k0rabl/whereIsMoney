import {IUser} from './user-model'
import User from './user-scheme'

export const findUser = (email: string) => User.findOne({email})
export const createUser = (user: IUser) => User.create(user)
