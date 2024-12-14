import { IProduct, IProductQuery } from './product.interface';
import { Product } from './products.model';

const isProductExist = async (name: string) => {
    const isExist = await Product.findOne({ name });
    return isExist;
};

const insertProduct = async (productData: IProduct) => {
    const createdProduct = await Product.create(productData);
    return createdProduct;
};

const findAllProducts = async (query: IProductQuery) => {
    const products = await Product.find(query);
    return products;
};
const findSpecificProduct = async (productId: string) => {
    const product = await Product.findById(productId);
    return product;
};

const updateAndGetProduct = async <T extends IProduct>(
    productId: string,
    document: Partial<T>,
) => {
    const product = await Product.findOneAndUpdate({ _id: productId }, document, {new: true});
    return product;
};

const removeProduct = async(productId: string) => {
    const deleteInfo = await Product.deleteOne({_id: productId})
    return deleteInfo
}

export { isProductExist, insertProduct, findAllProducts, findSpecificProduct, updateAndGetProduct, removeProduct };
