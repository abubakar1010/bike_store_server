import QueryBuilder from '../../utils/queryBuilder';
import { IProduct } from './product.interface';
import { Product } from './products.model';
import { productSearchableTerm } from './product.constant';

const isProductExist = async (name: string) => {
    const isExist = await Product.findOne({ name });
    return isExist;
};

const insertProduct = async (productData: IProduct) => {
    await Product.create(productData);
    const createdProduct = await Product.findOne({ name: productData.name });
    return createdProduct;
};

const findAllProducts = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
        Product.find(),
        query,
      )
        .search(productSearchableTerm)
        .filter()
        .sort()
        .paginate()
    
      const result = await productQuery.modelQuery;
      const meta = await productQuery.countTotal();
    return {
        meta,
        result
    };
};
const findSpecificProduct = async (productId: string) => {
    const product = await Product.findById(productId);
    return product;
};

const updateAndGetProduct = async <T extends IProduct>(
    productId: string,
    document: Partial<T>,
) => {
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        document,
        { new: true },
    );
    return product;
};

const removeProduct = async (productId: string) => {
    const deleteInfo = await Product.deleteOne({ _id: productId });
    return deleteInfo;
};

export {
    isProductExist,
    insertProduct,
    findAllProducts,
    findSpecificProduct,
    updateAndGetProduct,
    removeProduct,
};
