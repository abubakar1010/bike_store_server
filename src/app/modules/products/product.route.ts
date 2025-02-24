import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSpecificProducts,
    updateProduct,
} from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = Router();

router.route('/products').post(upload.single('file'), createProduct);
router.route('/products').get(getAllProducts);
router.route('/products/:productId').get(getSpecificProducts);
router.route('/products/:productId').put(updateProduct);
router.route('/products/:productId').delete(deleteProduct);

export const productRoute = router;
