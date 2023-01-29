import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ComponentItem } from '../models/component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  componentList: ComponentItem[];
  components: ComponentItem[] = [];
  subTotal: any;
  user: User;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if(Object.keys(this.user).length == 0 || this.user == null){
      this.router.navigate(['login-registraion-page']);
    }
    localStorage.clear();
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.productService.getAllComponents().subscribe({
      next: (res: any) => {
        console.log(res);
        this.componentList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
        this.productService.loadComponentCart();
        this.components = this.productService.getComponents();
      }
    })
  }

  addToCart(component: ComponentItem) {
    if (!this.productService.comonentInCart(component)) {
      this.productService.addComponentsToCart(component);
      this.components = [...this.productService.getComponents()];
      this.subTotal = component.price;
    }
  }

  removeFromCart(component: ComponentItem) {
    this.productService.removeComponent(component);
    this.components = this.productService.getComponents();
  }

  get total() {
    return this.components?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    if (this.components.length > 0) {
      localStorage.setItem('cartTotal', JSON.stringify(this.total));
      localStorage.setItem('cartItems', JSON.stringify(this.productService.getComponents()));
      this.router.navigate(['/payment-page']);
    } else {
      alert("Please select a product for checkout!");
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }

}
