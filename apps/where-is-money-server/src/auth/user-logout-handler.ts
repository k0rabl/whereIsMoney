import e from 'express'
import {isLeft} from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import {PathReporter} from 'io-ts/lib/PathReporter'

export const LogoutUser = t.type({
  token: t.string,
})

export type UserLogoutT = t.TypeOf<typeof LogoutUser>

export const userLogoutHandler = async (req: e.Request, res: e.Response) => {
  const decoded = LogoutUser.decode(req.body)

  if (isLeft(decoded)) {
    throw Error(
      `Could not validate data: ${PathReporter.report(decoded).join('\n')}`,
    )
  }

  // const { token }: UserLogoutT = decoded.right

  res.send('You are logout!')
  return
}
