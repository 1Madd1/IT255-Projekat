import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[];
  productList2: any[];
  products: any[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
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
    this.productService.getAllComponents().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList2 = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    })
    this.products = this.productService.getProduct();
  }

}
