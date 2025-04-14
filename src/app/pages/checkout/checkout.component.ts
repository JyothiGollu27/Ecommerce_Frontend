import { Component, OnInit, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  cartItems:any[]=[];
  totalPrice:number=0
  constructor(private http: HttpClient, private cartService: CartService, private router: Router) {}
  

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  this.totalPrice = this.cartService.getTotalCost();
  }

  onSubmit(checkoutForm:NgForm) {
    //const formValues=checkoutForm.value;

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

    this.http.post('/api/orders/checkout', order).subscribe(response => {
      console.log('Order placed successfully', response);
      this.cartService.clearCart();
      this.router.navigate(['/order-confirmation']); // Redirect to order confirmation page
    });
  }
}


