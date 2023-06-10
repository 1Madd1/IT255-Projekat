import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Computer } from '../models/computer';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {
  computerList: Computer[];
  computers: Computer[] = [];
  hasCreditCard: boolean;
  subTotal: any;
  user: User;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if (this.user.creditCard == null) {
      this.hasCreditCard = false;
    } else {
      this.hasCreditCard = true;
      this.user.creditCard.money = Math.round(this.user.creditCard.money * 100) / 100;
    }
    if (Object.keys(this.user).length == 0 || this.user == null) {
      this.router.navigate(['login-registraion-page']);
    }
    localStorage.clear();
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.productService.getAllComputers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.computerList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    });
    this.productService.loadComputerCart();
    this.computers = this.productService.getComputers();
  }


  addComputerToCart(computer: Computer) {
    if (this.hasCreditCard) {
      if (!this.productService.computerInCart(computer)) {
        this.productService.addComputersToCart(computer);
        this.computers = [...this.productService.getComputers()];
        this.subTotal = computer.price;
      }
    } else {
      alert("Please add a credit card!");
    }
  }

  removeComputerFromCart(computer: Computer) {
    this.productService.removeComputer(computer);
    this.computers = this.productService.getComputers();
  }

  get total() {
    return this.computers?.reduce(
      (sum, computer) => ({
        quantity: 1,
        price: sum.price + computer.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  checkout() {
    if (this.hasCreditCard) {
      if (this.computers.length > 0) {
        localStorage.setItem('cartTotal', JSON.stringify(this.total));
        //localStorage.setItem('cartItems', JSON.stringify(this.productService.getComputers()));
        localStorage.setItem('cartComputers', JSON.stringify(this.productService.getComputers()));
        this.router.navigate(['/payment-page']);
      } else {
        alert("Please select a product for checkout!");
      }
    } else {
      alert("Please add a credit card!");
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }

}
