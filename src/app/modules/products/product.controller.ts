import { Request, Response } from 'express';
import {
    findAllProducts,
    findSpecificProduct,
    insertProduct,
    isProductExist,
    UpdateProduct,
} from './product.services';
import productValidationSchema from './product.validation';
import { z } from 'zod';

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;

        productValidationSchema.parse(productData);

        const productAlreadyExist = await isProductExist(productData.name);
        if (productAlreadyExist) throw new Error('Product already exist');

        const createdProduct = await insertProduct(productData);
        if (!createdProduct)
            throw new Error('Something went wrong while inserting product');
        res.status(201).json({
            message: 'Bike Created Successfully',
            success: true,
            data: productData,
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

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const queryData = req.query;
        const products = await findAllProducts(queryData);
        if (!products) throw new Error('Product not found');
        res.status(200).json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: products,
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

const getSpecificProducts = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = await findSpecificProduct(productId);
        if (!product) throw new Error('Product not found');
        res.status(200).json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: product,
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

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const data = req.body;
        const updatedProduct = await UpdateProduct(productId, data);
        if (!updatedProduct) throw new Error('Product not found');
        res.status(200).json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: updatedProduct,
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

export { createProduct, getAllProducts, getSpecificProducts, updateProduct };
