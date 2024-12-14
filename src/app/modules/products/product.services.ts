import { IProduct } from './product.interface';
import { Product } from './products.model';

const isProductExist = async (name: string) => {
    const isExist = await Product.findOne({ name });
    return isExist;
};

const insertProduct = async(productData: IProduct) => {
    const createdProduct = await Product.create(productData)
    return createdProduct
}

export { isProductExist,insertProduct };
