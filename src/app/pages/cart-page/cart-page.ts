import { Product } from "../product-page/Product-page";


export interface CartItem {
  cartItemId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  product: Product;
}
