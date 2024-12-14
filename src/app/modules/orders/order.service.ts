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



export { isOrderAlreadyExist, insertOrder, updateStock };
