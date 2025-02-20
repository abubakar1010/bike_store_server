import { Router } from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from './constant';
import { UserControllers } from './user.controller';

const router = Router();

router.post(
    '/users/create-user',
    upload.single('file'),
    UserControllers.createUser,
);

router.get('/users', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get('/users/:id', UserControllers.getSingleUser);

router.patch(
    '/users/:id',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    UserControllers.updateUser,
);

router.delete('/users/:id', auth(USER_ROLE.admin), UserControllers.deleteUser);

router.patch(
    '/users/change-status/:id',
    auth(USER_ROLE.admin),
    UserControllers.changeStatus,
);

export const UserRoutes = router;
