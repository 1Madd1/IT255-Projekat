import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentItem } from '../models/component';
import { Computer } from '../models/computer';
import { User } from '../models/user';
import { ProductService } from '../services/product.service';

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
  user: User;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
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
