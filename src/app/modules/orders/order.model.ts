import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { Product } from '../products/products.model';

const orderSchema = new Schema<IOrder>(
    {
        email: {
            type: String,
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: Product,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Order = model<IOrder>('Order', orderSchema);
