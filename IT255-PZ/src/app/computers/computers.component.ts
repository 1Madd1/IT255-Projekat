import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  productList: any[];
  products: any[] = [];
  subTotal: any;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.productService.getAllComputers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    });
    this.productService.loadCart();
    this.products = this.productService.getProduct();
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
    localStorage.setItem('cartTotal', JSON.stringify(this.total));
    this.router.navigate(['/payment-page']);
  }

}
