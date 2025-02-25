export interface IProduct {
    name: string;
    brand: string;
    model: string;
    image: string;
    year: number;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted: boolean;
}

export interface IProductQuery {
    name?: string;
    brand?: string;
    model?: string;
    category?: string;
}
