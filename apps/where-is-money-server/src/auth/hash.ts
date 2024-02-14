import {randomBytes, scryptSync} from 'crypto'

export const generateSalt = () => randomBytes(16).toString('hex')

export const generatePasswordHash = (password: string, salt: string) =>
  scryptSync(password, salt, 64).toString('hex')
