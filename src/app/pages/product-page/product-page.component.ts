import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from './Product-page';



@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
