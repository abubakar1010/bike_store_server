import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        email: {
            type: String,
            required: [true, 'Please Provide your Email'],
            trim: true,
            validate: {
                validator: function (value: string) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                },
                message: '${VALUE} is not a valid email!',
            },
        },
        product: {
            type: Schema.Types.ObjectId,
            required: [true, 'Product is Required'],
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is Required'],
            min: [1, 'Quantity must be at least 1'],
        },
        totalPrice: {
            type: Number,
            required: [true, 'Total Price is Required'],
            min: [0, 'Total price must be at least 0'],
        },
        address: {
            type: String,
            required: [true, 'Address is Required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is Required'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
            default: 'Pending',
        },
        transaction: {
            id: String,
            transactionStatus: String,
            bank_status: String,
            sp_code: String,
            sp_message: String,
            method: String,
            date_time: String,
        },
        shippingStatus: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
            default: 'Pending',
        },
    },
    { timestamps: true },
);

export const Order = model<IOrder>('Order', OrderSchema);
