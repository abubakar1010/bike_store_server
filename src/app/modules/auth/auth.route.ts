import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/constant';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/auth/login', AuthControllers.loginUser);

router.post(
    '/auth/change-password',
    auth(USER_ROLE.customer, USER_ROLE.admin),
    AuthControllers.changePassword,
);

export const AuthRoutes = router;
