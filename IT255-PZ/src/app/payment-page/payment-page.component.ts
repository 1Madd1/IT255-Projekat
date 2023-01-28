import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  cartTotal!: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') as any) || [];
    this.cartTotal = Math.round(this.cartTotal * 100) / 100
    console.log(this.cartTotal);
  }

}
