import * as e from 'express'
import {isLeft} from 'fp-ts/Either'
import * as t from 'io-ts'
import {PathReporter} from 'io-ts/PathReporter'

import {generatePasswordHash, generateSalt} from './hash'
import {createUser, findUser} from './repository'
import {generateToken} from './token'

export const RegistrationUser = t.type({
  userName: t.string,
  password: t.string,
  email: t.string,
})

export type UserRegistrationT = t.TypeOf<typeof RegistrationUser>

export const userRegistartionHandler = async (
  req: e.Request,
  res: e.Response,
) => {
  const decoded = RegistrationUser.decode(req.body)

  if (isLeft(decoded)) {
    throw Error(
      `Could not validate data: ${PathReporter.report(decoded).join('\n')}`,
    )
  }

  const {userName, password, email}: UserRegistrationT = decoded.right

  if (await findUser(email)) {
    res.status(401).send(`User with ${email} already exist!`).end()
    return
  }
  const salt = generateSalt()
  const passwordHash = generatePasswordHash(password, salt)

  await createUser({
    userName,
    email,
    password: passwordHash,
    salt,

    items: [],
    categories: [],
    wallets: [],
  })

  const currentUser = await findUser(email)

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
