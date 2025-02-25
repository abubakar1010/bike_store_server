import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
    {
        brand: {
            type: String,
            required: [true, 'Brand Name is Required'],
        },
        model: {
            type: String,
            required: [true, 'Model Name is Required'],
        },
        image: {
            type: String,
            default: '',
        },
        year: {
            type: Number,
            required: [true, 'Year Field is Required'],
        },
        price: {
            type: Number,
            min: [0, 'Price must be a positive number'],
            required: [true, 'Price is Required'],
        },
        category: {
            type: String,
            enum: {
                values: [
                    'Sport Bike',
                    'Cruiser',
                    'Touring',
                    'Standard',
                    'Dirt Bike',
                    'Scooter',
                    'Electric Bike',
                ],
                message: '{VALUE} is not a valid category',
            },
            required: [true, 'Category is Required'],
        },
        description: {
            type: String,
            required: [true, 'Description is Required'],
        },
        quantity: {
            type: Number,
            min: [0, 'Quantity must be positive number'],
            required: [true, 'Quantity is Required'],
        },
        inStock: { type: Boolean, required: [true, 'In Stock is Required'] },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
