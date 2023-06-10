import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Computer } from '../models/computer';
import { ComponentItem } from '../models/component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  computers: Computer[] = [];
  components: ComponentItem[] = [];
  pomComputers: Computer[] = [];
  pomComponents: ComponentItem[] = [];

  constructor(private http: HttpClient) {
    this.getAllComponents().subscribe({
      next: (res: any) => {
        console.log(res);
        this.pomComponents = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    })

    this.getAllComputers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.pomComputers = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    })
  }

  getAllComputers() {
    return this.http.get('http://localhost:8080/computer/findAllNonEmpty');
  }

  getAllComponents() {
    return this.http.get('http://localhost:8080/component/findAllNonEmpty');
  }

  getComputers() {
    return this.computers;
  }

  getComponents() {
    return this.components;
  }

  getActualAmountByComponentId(id: number): number{
    for(var i = 0; i < this.pomComponents.length; i++){
      if(this.pomComponents[i].id === id){
        return this.pomComponents[i].quantity;
      }
    }
    return -1;
  }

  getActualAmountByComputerId(id: number){
    this.getAllComputers().subscribe({
      next: (res: any) => {
        this.pomComputers = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    })

    for(var i = 0; i < this.pomComputers.length; i++){
      if(this.pomComputers[i].id === id){
        return this.pomComputers[i].quantity;
      }
    }
    return -1;
  }

  saveComponentCart() {
    localStorage.setItem('componentCartItems', JSON.stringify(this.components));
  }

  saveComputerCart() {
    localStorage.setItem('computerCartItems', JSON.stringify(this.computers));
  }

  addComputersToCart(addedComputer: Computer) {
    this.computers.push(addedComputer);
    this.saveComputerCart();
  }

  addComponentsToCart(addedComponent: ComponentItem) {
    this.components.push(addedComponent);
    this.saveComponentCart();
  }

  loadComputerCart() {
    this.computers = JSON.parse(localStorage.getItem('computerCartItems') as any) || [];
  }

  loadComponentCart() {
    this.components = JSON.parse(localStorage.getItem('componentCartItems') as any) || [];
  }

  computerInCart(computer: Computer) {
    return this.computers.findIndex((x: any) => x.id === computer.id) > -1;
  }

  comonentInCart(component: ComponentItem) {
    return this.components.findIndex((x: any) => x.id === component.id) > -1;
  }

  removeComputer(computer: Computer) {
    const index = this.computers.findIndex((x: any) => x.id === computer.id);

    if(index > -1) {
      this.computers.splice(index, 1);
      this.saveComputerCart();
    }
  }

  removeComponent(component: ComponentItem) {
    const index = this.components.findIndex((x: any) => x.id === component.id);

    if(index > -1) {
      this.components.splice(index, 1);
      this.saveComponentCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }

  updateComputer(boughtComputer: Computer) {
    this.http.put("http://localhost:8080/computer", JSON.stringify(boughtComputer), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
      alert("An error has occurred!")
    })
  }

  updateComponent(boughtComponent: ComponentItem) {
    
    this.http.put("http://localhost:8080/component", JSON.stringify(boughtComponent), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
      alert("An error has occurred!")
    })
  }

  addComputerToPurchaseHistory(boughtComputer: Computer) {

  }

  addComponentToPurchaseHistory(boughtComponent: ComponentItem) {
    
  }

}
