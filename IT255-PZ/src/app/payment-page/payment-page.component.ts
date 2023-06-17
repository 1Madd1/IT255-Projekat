import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserDTO } from '../models/user';
import { Computer } from '../models/computer';
import { ComponentItem } from '../models/component';
import { CreditCardService } from '../services/credit-card.service';
import { ProductService } from '../services/product.service';
import { PurchaseHistoryService } from '../services/purchase-history.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  cartTotal!: any;
  //cartItems: any[];
  cartComputers: Computer[];
  cartComponents: ComponentItem[];
  hasCreditCard: boolean;
  user: User;

  constructor(private router: Router, private creditCardService: CreditCardService, private productService: ProductService, private purchaseHistoryService: PurchaseHistoryService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if (this.user.creditCard == null) {
      this.hasCreditCard = false;
    } else {
      this.hasCreditCard = true;
      this.user.creditCard.money = Math.round(this.user.creditCard.money * 100) / 100;
    }
    if (Object.keys(this.user).length == 0 || this.user == null) {
      localStorage.clear();
      this.router.navigate(['login-registraion-page']);
    }
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
    this.cartTotal = JSON.parse(localStorage.getItem('cartTotal') as any) || [];
    //this.cartItems = JSON.parse(localStorage.getItem('cartItems') as any) || [];
    this.cartComputers = JSON.parse(localStorage.getItem('cartComputers') as any) || [];
    this.cartComponents = JSON.parse(localStorage.getItem('cartComponents') as any) || [];
    console.log(this.cartComputers);
    console.log(this.cartComponents);
    this.cartTotal = Math.round(this.cartTotal * 100) / 100;
    
  }

  pay() {
    if (this.hasCreditCard) {
      if (this.user.creditCard.money >= this.cartTotal) {
        this.user.creditCard.money -= this.cartTotal;
        console.log(this.user.creditCard);
        var pomUser: UserDTO = new UserDTO(this.user.id, this.user.username, this.user.password, this.user.email, this.user.role, this.user.enabled);
        this.creditCardService.updateCreditCard({
          id: this.user.creditCard.id,
          user: pomUser,
          cardNumber: this.user.creditCard.cardNumber,
          cardDate: this.user.creditCard.cardDate,
          cvv2: this.user.creditCard.cvv2,
          money: this.user.creditCard.money
        })
        this.updateProducts();
        alert("Payment successful!")
        
        this.router.navigate(['home']);
      } else {
        alert("Not enough money!");
      }
    } else {
      alert("Please add a credit card!");
    }
  }

  // addComponentToPurchaseHistory(computer: Computer) {
  //   this.purchaseHistoryService.addComputerToHistory(computer);
  // }

  // addComputerToPurchaseHistory(component: ComponentItem) {
  //   this.purchaseHistoryService.addComponentToHistory(component);
  // }

  updateProducts() {
    
    if (this.cartComponents.length != 0) {
      
      for (let i = 0; i < this.cartComponents.length; i++) {
        //this.productService.updateComponent(this.cartComponents[i]);
        console.log(this.cartComponents[i]);
        var pomComponent: ComponentItem = new ComponentItem(this.cartComponents[i].id, this.cartComponents[i].name, this.cartComponents[i].image, this.cartComponents[i].description, this.cartComponents[i].manufacturer, this.cartComponents[i].quantity - 1, this.cartComponents[i].price);
        console.log(pomComponent);
        this.productService.updateComponent(pomComponent);
        this.purchaseHistoryService.addComponentToHistory(pomComponent, this.user.id);
      }
    }

    if (this.cartComputers.length != 0) {
      for (let i = 0; i < this.cartComputers.length; i++) {
        //this.productService.updateComponent(this.cartComponents[i]);
        console.log(this.cartComputers[i]);
        var pomComputer: Computer = new Computer(this.cartComputers[i].id, this.cartComputers[i].name, this.cartComputers[i].image, this.cartComputers[i].description, this.cartComputers[i].quantity - 1, this.cartComputers[i].price)
        console.log(pomComputer);
        this.productService.updateComputer(pomComputer);
        this.purchaseHistoryService.addComputerToHistory(pomComputer, this.user.id);
      }
    }

    this.router.navigate(['home']);
  }

}
