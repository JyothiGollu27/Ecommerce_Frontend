import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authService: AuthService) {}

  
private getUserKey(): string {
   const userEmail = this.authService.getEmail();
   return `orderHistory_${userEmail}`;
   }
  

  placeOrder(order: any): Observable<any> {
    const orderHistory = this.getOrderHistory();
    const orderId = orderHistory.length + 1;

    // Retrieve cartItems from local storage
    const cartItems = this.getCartItemsFromLocalStorage();

    // Ensure cartItems is defined and is an array
    const processedItems = Array.isArray(cartItems) ? cartItems.map((item: any) => ({
      productName: item.product.name,
      productImage: item.product.imageUrl,
      unitPrice: item.product.price,
      quantity: item.quantity
    })) : [];

    const newOrder = {
      orderId,
      orderItems: processedItems,
      orderDate: new Date()
    };

    /*orderHistory.push(newOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    return of(newOrder);*/
    
    orderHistory.push(newOrder);
  const userKey = this.getUserKey();
  localStorage.setItem(userKey, JSON.stringify(orderHistory));
  return of(newOrder);

  }

  /*getOrderHistory(): any[] {
    
    try {
      const orderHistory = localStorage.getItem('orderHistory');
      const parsed = orderHistory ? JSON.parse(orderHistory) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing orderHistory from localStorage', e);
      return [];
    }
  }

  private getCartItemsFromLocalStorage(): any[] {
    try {
      const cartItems = localStorage.getItem('cart');
      const parsed = cartItems ? JSON.parse(cartItems) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing cartItems from localStorage', e);
      return [];
    }
  }
  
// Method to clear order history
  clearOrderHistory(): void {
      localStorage.removeItem('orderHistory');
    }*/

   
getOrderHistory(): any[] {
      const userKey = this.getUserKey();
      try {
        const orderHistory = localStorage.getItem(userKey);
        const parsed = orderHistory ? JSON.parse(orderHistory) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Error parsing orderHistory from localStorage', e);
        return [];
      }
    }
  
private getCartItemsFromLocalStorage(): any[] {
  
    const userEmail = this.authService.getEmail();

        
    const cartKey = `cart_${userEmail}`;
    
      try {
        const cartItems = localStorage.getItem(cartKey);
        const parsed = cartItems ? JSON.parse(cartItems) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Error parsing cartItems from localStorage', e);
        return [];
      }
    }
  
clearOrderHistory(): void {
      const userKey = this.getUserKey();
      localStorage.removeItem(userKey);
    }
  
  
  
}
