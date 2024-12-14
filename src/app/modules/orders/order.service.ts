import { Product } from '../products/products.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const isOrderAlreadyExist = async (productId: string, email: string) => {
    const isExist = await Order.findOne({ product: productId, email });
    return isExist;
};

const insertOrder = async (orderData: IOrder) => {
    await Order.create(orderData);
    const orderedData = Order.findOne({ product: orderData.product, email: orderData.email });
    return orderedData;
};

const updateStock = async(productId: string, requestedQuantity: number) => {
    const product = await Product.findByIdAndUpdate(productId,{$inc:{quantity: -requestedQuantity}}, {new: true});
    if(product && product.quantity <= 0){
        product.inStock = false;
        product.save()
    }
}

export { isOrderAlreadyExist, insertOrder, updateStock };
