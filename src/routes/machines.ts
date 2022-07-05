import express from 'express'

// Middleware that checks if user's token is valid and get user from db to req
import auth from '../middlewares/auth'
// Midleware that checks if user is an admin
import { checkRoleAdmin } from '../middlewares/users'
import { checkErrors } from '../middlewares/validatorError'

import machineController from '../controllers/machines'
import { validateBody } from '../validators/machines'

const router = express.Router()

router.use(auth)
//router.use(checkErrors)

router.get('/', machineController.getAll)

router.get('/:id', machineController.getById)

router.post('/', checkRoleAdmin, validateBody, checkErrors, machineController.register)

router.put('/:id', checkRoleAdmin, validateBody, checkErrors, machineController.update)

router.delete('/:id', checkRoleAdmin, machineController.delete)

export default router
