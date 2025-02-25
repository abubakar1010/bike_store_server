/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../utils/queryBuilder';
import { IProduct } from './product.interface';
import { Product } from './products.model';
import { productSearchableTerm } from './product.constant';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import ApiError from '../../utils/apiError';

const isProductExist = async (name: string) => {
    const isExist = await Product.findOne({ name });
    return isExist;
};


const insertProduct = async (file: any, productData: IProduct) => {
    const imageName = `${productData.year}${productData?.brand}${productData.quantity}`;
    const { secure_url } = (await sendImageToCloudinary(
      imageName,
      file?.path,
    )) as { secure_url: string };
    const result = await Product.create(productData);
    result.image = secure_url;
    await result.save();
    return result;
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
    productData: Partial<T>,
) => {
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        productData,
        { new: true },
    );
    if(!product){
        throw new ApiError(404, "product update operation failed")
    }
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
