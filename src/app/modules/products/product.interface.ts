import { Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    brand: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
}

export interface IProductQuery {
    name?: string;
    brand?: string;
    category?: string;
}
