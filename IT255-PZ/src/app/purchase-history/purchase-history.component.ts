import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CreditCardService } from '../services/credit-card.service';
import { Router } from '@angular/router';
import { PurchaseHistory } from '../models/purchaseHistory';
import { PurchaseHistoryService } from '../services/purchase-history.service';
import { ComponentItem } from '../models/component';
import { Computer } from '../models/computer';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  user: User;
  creditCard: any;
  hasCreditCard: boolean;
  listOfPurchases: PurchaseHistory[] = [];
  listOfComponents: ComponentItem[] = [];
  listOfComputers: Computer[] = [];
  constructor(private router: Router, private purchaseHistoryService: PurchaseHistoryService) { }

  ngOnInit(): void {
    console.log("Alooo")
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
    this.purchaseHistoryService.getAllPurchases(this.user.id).subscribe((data: any) => {
      this.listOfPurchases = data;
      console.log(this.listOfPurchases);
      console.log(this.listOfPurchases[0].component);
    }, error => {
      console.log(error);
      alert("An error has occurred!");
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }

}
