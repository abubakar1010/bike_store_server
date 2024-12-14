import { Request, Response } from 'express';
import {
    calculateRevenue,
    insertOrder,
    isOrderAlreadyExist,
    updateStock,
} from './order.service';
import orderValidationSchema from './order.validation';
import { z } from 'zod';
import { findSpecificProduct } from '../products/product.services';

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;

        orderValidationSchema.parse(orderData);

        const product = await findSpecificProduct(orderData.product);

        if (!product)
            throw new Error('The product for your order does not exist.');

        if (!product.inStock)
            throw new Error('The product is currently out of stock.');

        if (product.quantity < orderData.quantity)
            throw new Error(
                `Insufficient stock: Only ${product.quantity} units are available.`,
            );

        const orderAlreadyExist = await isOrderAlreadyExist(
            orderData.product,
            orderData.email,
        );
        if (orderAlreadyExist) throw new Error('Order already exist');

        const createdOrder = await insertOrder(orderData);
        if (!createdOrder)
            throw new Error('Something went wrong while inserting order');

        await updateStock(orderData.product, orderData.quantity);

        res.status(201).json({
            message: 'Order Created Successfully',
            success: true,
            data: createdOrder,
        });
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(500).json({
                message: error.issues[0].message || 'Something went wrong',
                success: false,
                error: error,
                stack: error.stack,
            });
        } else if (error instanceof Error) {
            res.status(500).json({
                message: error.message || 'Something went wrong',
                success: false,
                error: error,
                stack: error.stack,
            });
        } else {
            res.status(500).json({
                message: 'Unknown error occurred',
                success: false,
                error: error,
            });
        }
    }
};

const generateRevenue = async (req: Request, res: Response) => {
    try {
        const revenue = await calculateRevenue();
        if(revenue <= 0) throw new Error("Something went wrong while calculating revenue")
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue: revenue,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message || 'Something went wrong',
                success: false,
                error: error,
                stack: error.stack,
            });
        } else {
            res.status(500).json({
                message: 'Unknown error occurred',
                success: false,
                error: error,
            });
        }
    }
};
export { createOrder, generateRevenue };

