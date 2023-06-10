import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Computer } from '../models/computer';
import { ComponentItem } from '../models/component';
import { PurchaseHistory, PurchaseHistoryDTO } from '../models/purchaseHistory';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  purchaseHistory: PurchaseHistory[] = [];
  constructor(private http: HttpClient) {}

  getAllPurchases(userId: number){
    return this.http.get("http://localhost:8080/purchaseHistory/userId?userId=" + userId);
  }

  addComputerToHistory(computer: Computer, userId: number){

    // this.http.post("http://localhost:8080/creditCard", JSON.stringify(creditCard), {
    //   headers: new HttpHeaders()
    //     .set('Content-Type', 'application/json; charset=utf-8')
    // }).subscribe((data: any) => {
    //   this.purchaseHistory = data;
    //   console.log(this.purchaseHistory);
    // }, error => {
    //   console.log(error);
    //   alert("An error has occurred!")
    // })

    var pomPurchaseHistory = new PurchaseHistoryDTO;
    pomPurchaseHistory.computerId = computer.id;
    pomPurchaseHistory.quantity = 1;
    pomPurchaseHistory.totalPrice = computer.price;
    pomPurchaseHistory.userId = userId;
    pomPurchaseHistory.purchaseDate = new Date().toDateString();
    console.log("-------------------------------------------")
    console.log(computer);
    console.log(pomPurchaseHistory);
    this.http.post("http://localhost:8080/purchaseHistory", JSON.stringify(pomPurchaseHistory), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
      alert("An error has occurred!")
    })
  }

  addComponentToHistory(component: ComponentItem, userId: number){
    var pomPurchaseHistory = new PurchaseHistoryDTO;
    pomPurchaseHistory.componentId = component.id;
    pomPurchaseHistory.quantity = 1;
    pomPurchaseHistory.totalPrice = component.price;
    pomPurchaseHistory.userId = userId;
    pomPurchaseHistory.purchaseDate = new Date().toDateString();
    console.log("-------------------------------------------")
    console.log(component);
    console.log(pomPurchaseHistory);
    this.http.post("http://localhost:8080/purchaseHistory", JSON.stringify(pomPurchaseHistory), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
      alert("An error has occurred!")
    })
  }
}