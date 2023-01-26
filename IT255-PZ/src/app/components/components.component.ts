import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllComponents().subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log("Request Completed!");
      }
    })
  }

}
