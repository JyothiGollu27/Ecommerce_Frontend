import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from './Product-page';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../cart-page/cart-page';



@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, 
    private router: Router,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      console.log(data)
      this.products = data;
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.productId !== id);
    });
  }
 
  /*addToCart(product: Product): void {
    const cartItem: CartItem = {
      cartItemId: 0, // Assuming the backend generates this ID
      productId: product.productId,
      quantity: 1,
      totalPrice: product.price,
      product:product
    };
    console.log('CartItem:', cartItem); 
    this.cartService.addToCart(cartItem).subscribe(() => {
      this.router.navigate(['/cart']); // Navigate to cart page after adding item
    });
  }*/
  
    addToCart(product:Product) {
      this.cartService.addToCart(product);
      //alert(`${product.name} added to cart successfully`);
    }
  
 
}
