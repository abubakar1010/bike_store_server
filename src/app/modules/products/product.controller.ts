import { Request, Response } from 'express';
import {
    findAllProducts,
    findSpecificProduct,
    insertProduct,
    removeProduct,
    updateAndGetProduct,
} from './product.services';
import handleAsync from '../../utils/handleAsync';
import ApiError from '../../utils/apiError';

const createProduct = handleAsync(async (req, res) => {

        if (!req.file) {
            throw new ApiError(404, "Image file is required")
        }

        const productData = JSON.parse(req.body.data);


        console.log(productData, req.file);
        const result = await insertProduct(req.file, productData);
        if (!result) {
            throw new ApiError(500, "Failed to create Product")
        }

        res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: result,
        });
    
});
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
        const data = JSON.parse(req.body.data);
        console.log(req.body,productId)
        const updatedProduct = await updateAndGetProduct(productId, data);
        if (!updatedProduct) throw new Error('Product not found');
        res.status(200).json({
            message: 'Bikes updated successfully',
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
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = await findSpecificProduct(productId);
        if (!product) throw new Error('Product not found');
        const deleteInfo = await removeProduct(productId);
        if (!(deleteInfo.acknowledged && deleteInfo.deletedCount > 0))
            throw new Error('Something went wrong while deleting product');
        res.status(200).json({
            message: 'Bikes deleted successfully',
            success: true,
            data: deleteInfo,
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

export {
    createProduct,
    getAllProducts,
    getSpecificProducts,
    updateProduct,
    deleteProduct,
};
