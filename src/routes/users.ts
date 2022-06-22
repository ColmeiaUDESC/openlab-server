import express from 'express';

// Middleware that checks if user's token is valid and get user from db to req
import auth from '../middlewares/auth';
import UsersController from '../controllers/users';

const router = express.Router();

router.use(auth);

router.get('/', UsersController.getAllUsers);

export default router;
