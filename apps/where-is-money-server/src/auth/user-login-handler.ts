import * as e from 'express'
import {isLeft} from 'fp-ts/Either'
import * as t from 'io-ts'
import {PathReporter} from 'io-ts/PathReporter'

import {generatePasswordHash} from './hash'
import {findUser} from './repository'
import {generateToken} from './token'

export const LoginUser = t.type({
  password: t.string,
  email: t.string,
})

export type UserLoginT = t.TypeOf<typeof LoginUser>

export const userLoginHandler = async (req: e.Request, res: e.Response) => {
  const decoded = LoginUser.decode(req.body)

  if (isLeft(decoded)) {
    throw Error(
      `Could not validate data: ${PathReporter.report(decoded).join('\n')}`,
    )
  }

  const {password, email}: UserLoginT = decoded.right

  const currentUser = await findUser(email)

  if (!currentUser) {
    res.status(401).send(`User with ${email} doesent exist!`).end()
    return
  }

  const passwordHash = generatePasswordHash(password, currentUser.salt)

  if (passwordHash !== currentUser.password) {
    res.status(402).send(`Password is incorrect!`).end()
    return
  }

  const token = generateToken(email, currentUser._id)

  res
    .send({
      token,
      user: {
        id: currentUser._id,
        email: currentUser.email,
        userName: currentUser.userName,

        password: currentUser.password,

        items: currentUser.items,
        categories: currentUser.categories,
        wallets: currentUser.wallets,
      },
    })
    .end()
  return
}
