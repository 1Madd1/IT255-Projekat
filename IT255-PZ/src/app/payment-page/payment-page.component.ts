import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  cartTotal!: any;
  cartItems: any[];
  user: User;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if (Object.keys(this.user).length == 0 || this.user == null) {
      localStorage.clear();
      this.router.navigate(['login-registraion-page']);
    }
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') as any) || [];
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') as any) || [];
    this.cartTotal = Math.round(this.cartTotal * 100) / 100
    console.log(this.cartTotal);
    console.log(this.cartItems);
  }

  pay() {
    if (this.user.creditCard.moneyAmount >= this.cartTotal) {
      this.user.creditCard.moneyAmount -= this.cartTotal;
      console.log(this.user.creditCard.moneyAmount);
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));
      this.http.put<any>("http://localhost:3000/users/" + this.user.id, this.user).subscribe(data => {
        alert("Payment successfull!");
        this.router.navigate(['home']);
      });
    } else {
      alert("Not enough money!");
    }
  }

}
