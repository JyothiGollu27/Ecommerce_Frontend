export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }

  export interface cartItem extends Product{
    quantity:number;
  }