import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCard, CreditCardDTO, UpdateCreditCardDTO } from '../models/creditCard';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  user: User;
  loadedCreditCard: any[];

  constructor(private http: HttpClient, private router: Router) { }

  getCreditCard(){
    // return this.http.get('http://localhost:8080/creditCard/userId');
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    this.http.get("http://localhost:8080/creditCard?userId=" + this.user.id).subscribe((data: any) => {
      this.loadedCreditCard = data;
      console.log(this.loadedCreditCard);
      this.user.creditCard = this.loadedCreditCard[0];
      console.log(this.user.creditCard);
      localStorage.setItem("loggedInUser", JSON.stringify(this.user));
    }, error => {
      console.log(error);
      alert("An error loading user credit card has occurred!")
    })
  }

  addCreditCard(creditCard: CreditCardDTO){
    this.http.post("http://localhost:8080/creditCard", JSON.stringify(creditCard), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
      this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
      this.user.creditCard = data;
      localStorage.setItem("loggedInUser", JSON.stringify(this.user));
      alert("Credit Card added successfully!")
      document.location.reload();
    }, error => {
      console.log(error);
      alert("An error has occurred!")
    })
  }

  updateCreditCard(creditCard: UpdateCreditCardDTO){
    console.log(creditCard);
    this.http.put("http://localhost:8080/creditCard", JSON.stringify(creditCard), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
      this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
      this.user.creditCard = data;
      localStorage.setItem("loggedInUser", JSON.stringify(this.user));
      alert("Credit Card updated successfully!");
    }, error => {
      console.log(error);
      alert("An error has occurred!")
    })
  }

}
