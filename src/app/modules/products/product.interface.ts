
export interface IProduct{
    name: string;
    brand: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
};

export interface IOrder{
    email: string;
    product: string;
    quantity: number;
    totalPrice: number;
};
