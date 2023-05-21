import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: Object;
  constructor(private http: HttpClient) { }

  getMaxId() {
    var maxId = 0;
    this.http.get<any>("https://localhost:8080/user").subscribe(data => {
      const user = data.find((pomUser: any) => {
        if(pomUser.id > maxId){
          maxId = pomUser.id;
        }
      });
    });
    return maxId;
  }

  getAllUsers() {
    return this.http.get('https://localhost:8080/user');
  }

}
