import jwt from 'jsonwebtoken'
import {Types} from 'mongoose'

export const generateToken = (email: string, id: Types.ObjectId) =>
  jwt.sign({email, id}, process.env.SECRET_KEY)
