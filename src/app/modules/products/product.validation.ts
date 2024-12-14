import { z } from 'zod';

const productValidationSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
        message: 'Category must be one of: Mountain, Road, Hybrid, Electric',
    }),
    description: z.string().min(20, { message: 'Description is required' }),
    quantity: z.number().int().nonnegative({
        message: 'Quantity must be a non-negative integer',
    }),
    inStock: z.boolean({
        message: 'InStock must be a boolean',
    }),
});

export default productValidationSchema;
