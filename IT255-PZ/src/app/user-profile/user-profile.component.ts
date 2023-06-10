import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  creditCard: any;
  hasCreditCard: boolean;
  showCreditCardForm: boolean;
  constructor(private router: Router, private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if(this.user.creditCard == null){
      this.hasCreditCard = false;
    } else {
      this.hasCreditCard = true;
      this.user.creditCard.money = Math.round(this.user.creditCard.money * 100) / 100;
      this.creditCard = this.user.creditCard;
    }
    
    if(Object.keys(this.user).length == 0 || this.user == null){
      this.router.navigate(['login-registraion-page']);
    }
    localStorage.clear();
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  }

  creditCardValidation(cardNumber: string, cardDate: string, cvv2: string): boolean {
    if (cardNumber.length != 19) {
      alert("Credit card number must have 16 numbers!");
      return false;
    }
    if (/[a-zA-Z]/.test(cardNumber) || /[a-zA-Z]/.test(cardDate) || /[a-zA-Z]/.test(cvv2)) {
      alert("Credit card number/date/cvv2 can't have letters!");
      return false;
    }
    if (!/[/]/.test(cardDate) || cardDate.length != 5) {
      alert("Invalid credit card date!");
      return false;
    }
    if (cvv2.length != 3) {
      alert("Invalid CVV2!");
      return false;
    }
    return true;
  }

  addCreditCard(cardNumber: HTMLInputElement, cardDate: HTMLInputElement, cvv2: HTMLInputElement) {
    if(this.creditCardValidation(cardNumber.value, cardDate.value, cvv2.value)){
      this.creditCardService.addCreditCard({
        userId: this.user.id,
        number: cardNumber.value,
        date: cardDate.value,
        cvv2: cvv2.value,
        money: 20000.00
      })
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }

}
