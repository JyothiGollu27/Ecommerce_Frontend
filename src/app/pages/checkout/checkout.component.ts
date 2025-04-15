import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalCost();
  }

  onSubmit(checkoutForm: NgForm) {
    const order = {
      userId: 1, // Replace with actual user ID
      totalPrice: this.totalPrice,
      shippingAddress: checkoutForm.value.address,
      paymentMethod: checkoutForm.value.paymentMethod,
      cartItems: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };

    this.orderService.placeOrder(order).subscribe({
      next: response => {
        console.log('Order placed successfully', response);
        alert('Order placed successfully');
        this.cartService.clearCart();
        this.router.navigate(['/products']); // Redirect to products page
        this.storeOrderData(response);
      },
      error: error => {
        console.error('There was an error!', error);
        alert('Failed to place order. Please try again later.');
      }
    });
  }

  storeOrderData(order: any) {
    // Retrieve existing order history from local storage
    const existingOrderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    // Add the new order to the existing order history
    existingOrderHistory.push(order);
    // Store the updated order history back to local storage
    localStorage.setItem('orderHistory', JSON.stringify(existingOrderHistory));
  }
}
