import express from 'express';

// Middleware that checks if user's token is valid and get user from db to req
import auth from '../middlewares/auth';
import { checkRoleAdmin, checkIsUserOrAdmin } from '../middlewares/users'

import UsersController from '../controllers/users';

const router = express.Router();

router.use(auth);

router.get('/', checkRoleAdmin, UsersController.getAllUsers);

router.get('/:id', checkIsUserOrAdmin, UsersController.getUser);

router.put('/:id', checkIsUserOrAdmin, UsersController.updateUser);

router.delete('/:id', checkIsUserOrAdmin, UsersController.deleteUser);

router.put('/:id/changeStatus', checkIsUserOrAdmin, UsersController.changeUser);

export default router;
