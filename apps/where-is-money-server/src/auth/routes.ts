import express from 'express'

import {userLoginHandler} from './user-login-handler'
import {userLogoutHandler} from './user-logout-handler'
import {userRegistartionHandler} from './user-registration-handler'

const authRouter = express.Router()

authRouter.post('/registration', userRegistartionHandler)
authRouter.post('/login', userLoginHandler)
authRouter.post('/logout', userLogoutHandler)

export default authRouter
