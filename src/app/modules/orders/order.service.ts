/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiError from '../../utils/apiError';
import { Product } from '../products/products.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import httpStatus from 'http-status';
import { orderUtils } from './order.utils';

const orderProduct = async (
    orderData: IOrder,
    user: any,
    client_ip: string,
) => {
    const product = await Product.findById(orderData.product);

    if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found');

    if (product.quantity < orderData.quantity) {
        return {
            status: false,
            message: `Insufficient stock. Only ${product.quantity} unit(s) available.`,
        };
    }

    if (orderData.totalPrice !== product?.price * orderData.quantity) {
        return {
            status: false,
            message: `Total price must be Quantity * product Price Per Unit`,
        };
    }

    let newOrder = await Order.create({ ...orderData, userId: user.id });

    product.quantity -= orderData.quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    // payment integration
    const shurjopayPayPaymentInfo = {
        amount: orderData.totalPrice,
        order_id: newOrder._id,
        currency: 'BDT',
        customer_name: user.name,
        customer_address: orderData.address,
        customer_email: user.email,
        customer_phone: orderData.phone,
        customer_city: user.city || 'Dhaka',
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayPaymentInfo);

    if (payment?.transactionStatus) {
        newOrder = await newOrder.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;

};

const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                'transaction.id': order_id,
            },
            {
                'transaction.bank_status': verifiedPayment[0].bank_status,
                'transaction.sp_code': verifiedPayment[0].sp_code,
                'transaction.sp_message': verifiedPayment[0].sp_message,
                'transaction.transactionStatus':
                    verifiedPayment[0].transaction_status,
                'transaction.method': verifiedPayment[0].method,
                'transaction.date_time': verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == 'Success'
                        ? 'Paid'
                        : verifiedPayment[0].bank_status == 'Failed'
                          ? 'Pending'
                          : verifiedPayment[0].bank_status == 'Cancel'
                            ? 'Cancelled'
                            : '',
            },
        );
    }

    return verifiedPayment;
};

const getTotalRevenue = async () => {
    const result = await Order.aggregate([
        {
            $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
        },
        {
            $project: { _id: 0 },
        },
    ]);
    return result[0];
};

const getOrdersByCustomer = async (id: string) => {
    const isCustomerExist = await User.findById(id);
    if (!isCustomerExist) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized!');
    }
    const result = await Order.find({ userId: id }).populate({
        path: 'product',
        model: Product,
    });
    return {
        data: result,
    };
};

const getAllOrders = async () => {
    const result = await Order.find().populate({
        path: 'product',
        model: Product,
    });
    return {
        data: result,
    };
};

const updateShippingStatus = async (payload: {
    id: string;
    shippingStatus: string;
}) => {
    const result = await Order.findByIdAndUpdate(
        payload?.id,
        {
            shippingStatus: payload.shippingStatus,
        },
        { new: true },
    );

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong!');
    }

    return result;
};

export const OrderServices = {
    orderProduct,
    verifyPayment,
    getTotalRevenue,
    getOrdersByCustomer,
    getAllOrders,
    updateShippingStatus,
};
