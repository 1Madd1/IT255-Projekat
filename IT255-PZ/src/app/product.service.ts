import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllComputers() {
    return this.http.get('assets/computers.json');
  }

  getAllComponents() {
    return this.http.get('assets/components.json');
  }

}
