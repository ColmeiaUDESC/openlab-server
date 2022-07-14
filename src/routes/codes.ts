import express from 'express'

// Middleware that checks if user's token is valid and get user from db to req
import auth from '../middlewares/auth'
// Midleware that checks if user is an admin
import { checkRoleAdmin } from '../middlewares/users'

import codeController from '../controllers/codes'

const router = express.Router()

router.use(auth)
//router.use(checkErrors)

router.get('/', checkRoleAdmin, codeController.getAll)

router.get('/:id', checkRoleAdmin, codeController.getById)

router.post('/', checkRoleAdmin, codeController.register)

router.delete('/:id', checkRoleAdmin, codeController.delete)

export default router