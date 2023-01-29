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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if(Object.keys(this.user).length == 0 || this.user == null){
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

}
