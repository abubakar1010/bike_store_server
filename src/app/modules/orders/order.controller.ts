import { Request, Response } from 'express';
import { IOrder } from './order.interface';
import handleAsync from '../../utils/handleAsync';
import { OrderServices } from './order.service';
import apiResponse from '../../utils/apiResponse';
import httpStatus from 'http-status'

const orderProduct = handleAsync(async (req: Request, res: Response) => {
        const user = req.user;
        const orderData: IOrder = req.body;
        const result = await OrderServices.orderProduct(
            orderData,
            user,
            req.ip!,
        );
        res.json({
            success: true,
            statusCode: httpStatus.CREATED,
            message:
                typeof result === 'object' && 'message' in result
                    ? result.message
                    : 'Order placed successfully',
            data: result,
        })
})

const verifyPayment = handleAsync(async (req, res) => {
    const order = await OrderServices.verifyPayment(
        req.query.order_id as string,
    );

    res.json({
        statusCode: httpStatus.CREATED,
        message: 'Order verified successfully',
        data: order,
    });
});

const getTotalRevenue = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getTotalRevenue();
        res.json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.json({
                message: 'Error Occurred',
                status: false,
                error: error,
                stack: error.stack,
            });
        } else {
            res.json({
                message: 'Error Occurred',
                status: false,
                error: error,
            });
        }
    }
};

const getOrdersByCustomer = handleAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OrderServices.getOrdersByCustomer(id);
    apiResponse(res, {
        success: true,
        message: 'Orders Retrieved Successfully',
        statusCode: httpStatus.OK,
        data: result.data,
    });
});

const getAllOrders = handleAsync(async (req, res) => {
    const result = await OrderServices.getAllOrders();
    apiResponse(res, {
        success: true,
        message: 'Orders Retrieved Successfully',
        statusCode: httpStatus.OK,
        data: result.data,
    });
});

const updateShippingStatus = handleAsync(async (req, res) => {
    const result = await OrderServices.updateShippingStatus(req.body);
    apiResponse(res, {
        success: true,
        message: 'Shipping Status Updated',
        statusCode: httpStatus.OK,
        data: result,
    });
});

export const OrderControllers = {
    orderProduct,
    getTotalRevenue,
    verifyPayment,
    getOrdersByCustomer,
    getAllOrders,
    updateShippingStatus,
};
