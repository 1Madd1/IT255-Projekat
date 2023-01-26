import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllComputers().subscribe({
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
