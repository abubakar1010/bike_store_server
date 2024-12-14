import { Product } from './products.model';

const isProductExist = async (name: string) => {
    const isExist = await Product.findOne({ name });
    return isExist;
};

export { isProductExist };
