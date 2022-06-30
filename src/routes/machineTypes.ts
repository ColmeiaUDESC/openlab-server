import express from 'express';

// Middleware that checks if user's token is valid and get user from db to req
import auth from '../middlewares/auth';
import { checkRoleAdmin } from '../middlewares/users'

import MachineTypeController from '../controllers/machineTypes';

const router = express.Router();

router.use(auth);

router.get('/', checkRoleAdmin, MachineTypeController.getAll);

router.get('/:id', checkRoleAdmin, MachineTypeController.getById);

router.post('/', checkRoleAdmin, MachineTypeController.register);

router.put('/:id', checkRoleAdmin, MachineTypeController.update);

router.delete('/:id', checkRoleAdmin, MachineTypeController.delete);

export default router;
