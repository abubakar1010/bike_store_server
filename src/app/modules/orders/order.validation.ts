import { z } from 'zod';
const orderValidationSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
    product: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, { message: 'Invalid product ID format' })
        .min(1, { message: 'Product is required' }),
    quantity: z
        .number()
        .int({ message: 'Quantity must be an integer' })
        .positive({ message: 'Quantity must be greater than zero' }),
    totalPrice: z
        .number()
        .positive({ message: 'Total price must be greater than zero' }),
});

export default orderValidationSchema;
