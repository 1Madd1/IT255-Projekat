import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  productList: any[];
  products: any[] = [];
  subTotal: any;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.productService.getAllComponents().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
        this.productService.loadCart();
        this.products = this.productService.getProduct();
      }
    })
  }

  addToCart(product: any) {
    if (!this.productService.productInCart(product)) {
      this.productService.addToCart(product);
      this.products = [...this.productService.getProduct()];
      this.subTotal = product.price;
    }
  }

  removeFromCart(product: any) {
    this.productService.removeProduct(product);
    this.products = this.productService.getProduct();
  }

  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    if (this.products.length > 0) {
      localStorage.setItem('cartTotal', JSON.stringify(this.total));
      this.router.navigate(['/payment-page']);
    } else {
      alert("Please select a product for checkout!");
    }
  }

}
