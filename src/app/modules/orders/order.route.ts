import { Router } from 'express';
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/constant';

const router = Router();

router.post(
    '/orders',
    auth(USER_ROLE.customer, USER_ROLE.admin),
    OrderControllers.orderProduct,
);
router.get(
    '/orders/verify',
    auth(USER_ROLE.customer, USER_ROLE.admin),
    OrderControllers.verifyPayment,
);
router.get(
    '/orders/revenue',
    auth(USER_ROLE.admin),
    OrderControllers.getTotalRevenue,
);
router.get('/orders/:id', OrderControllers.getOrdersByCustomer);
router.get('/orders', auth(USER_ROLE.admin), OrderControllers.getAllOrders);
router.patch(
    '/orders/update-status',
    auth(USER_ROLE.admin),
    OrderControllers.updateShippingStatus,
);

export const OrderRoute = router;
