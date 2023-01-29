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
    this.http.get<any>("http://localhost:3000/users").subscribe(data => {
      const user = data.find((pomUser: any) => {
        if(pomUser.id > maxId){
          maxId = pomUser.id;
        }
      });
    });
    return maxId;
  }
}
