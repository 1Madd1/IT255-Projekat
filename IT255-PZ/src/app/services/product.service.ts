import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Computer } from '../models/computer';
import { ComponentItem } from '../models/component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  computers: Computer[] = [];
  components: ComponentItem[] = [];

  constructor(private http: HttpClient) { }

  getAllComputers() {
    return this.http.get('../assets/computers.json');
  }

  getAllComponents() {
    return this.http.get('../assets/components.json');
  }

  getComputers() {
    return this.computers;
  }

  getComponents() {
    return this.components;
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

}
