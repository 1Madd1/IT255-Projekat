import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentItem } from '../models/component';
import { Computer } from '../models/computer';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';
import { CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  computerList: Computer[];
  componentList: ComponentItem[];
  computers: Computer[] = [];
  components: ComponentItem[] = [];
  hasCreditCard: boolean;
  user: User;
  constructor(private productService: ProductService, private router: Router, private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    console.log("Alloooo")
    this.creditCardService.getCreditCard();
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if(this.user.creditCard == null){
      this.hasCreditCard = false;
    } else {
      this.hasCreditCard = true;
      this.user.creditCard.money = Math.round(this.user.creditCard.money * 100) / 100;
    }
    if(Object.keys(this.user).length == 0 || this.user == null){
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
      }
    })
    this.computers = this.productService.getComputers();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }

}
