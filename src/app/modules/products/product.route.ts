import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSpecificProducts,
    updateProduct,
} from './product.controller';

const router = Router();

router.route('/products').post(createProduct);
router.route('/products').get(getAllProducts);
router.route('/products/:productId').get(getSpecificProducts);
router.route('/products/:productId').put(updateProduct);
router.route('/products/:productId').delete(deleteProduct);

export const productRoute = router;
