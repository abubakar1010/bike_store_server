import { Request, Response } from 'express';
import { insertProduct, isProductExist } from './product.services';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;

        productValidationSchema.parse(productData);

        const productAlreadyExist = await isProductExist(productData.name);
        if (productAlreadyExist) throw new Error('Product already exist');

        const createdProduct = await insertProduct(productData)
        if (!createdProduct)
            throw new Error('Something went wrong while inserting product');
        res.status(201).json({
            message: 'Bike Created Successfully',
            success: true,
            data: productData,
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

export { createProduct };
