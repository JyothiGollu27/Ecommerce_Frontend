import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from '../pages/cart-page/cart-page'; 
import { AuthService } from './auth.service';
import { Product } from '../pages/product-page/Product-page';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7247/api/CartItems';
  private cart: CartItem[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadCart();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addToCart(product: Product) {
    const cartItem: CartItem = {
      cartItemId: this.cart.length + 1, // Example ID generation
      productId: product.productId,
      quantity: 1,
      totalPrice: product.price,
      product: product
    };
    this.cart.push(cartItem);
    this.saveCart();
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  getTotalCost(): number {
    return this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  updateQuantity(productId: number, quantity: number) {
    const cartItem = this.cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      if (cartItem.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        cartItem.totalPrice = cartItem.product.price * cartItem.quantity;
      }
      this.saveCart();
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }
}
