import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUserDTO, RegisterUserDTO, UserDTO} from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: Object;
  constructor(private http: HttpClient, private router: Router) { }

  getMaxId() {
    var maxId = 0;
    this.http.get<any>("http://localhost:8080/user").subscribe(data => {
      const user = data.find((pomUser: any) => {
        if(pomUser.id > maxId){
          maxId = pomUser.id;
        }
      });
    });
    return maxId;
  }

  getAllUsers() {
    return this.http.get('http://localhost:8080/user');
  }

  loginUser(user: LoginUserDTO){
    console.log(user);
    this.http.post("http://localhost:8080/login_register/login", JSON.stringify(user), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe((data) => {
      console.log(data);
      localStorage.setItem("loggedInUser", JSON.stringify(data))

      this.router.navigate(["home"])
    }, error => {
      console.log(error)
      alert("An error has occurred")
    })
  }

  registerUser(user: RegisterUserDTO){
    console.log(user, "nervni slom");
    this.http.post("http://localhost:8080/login_register/register", JSON.stringify(user), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe(user => {
      alert("Successful registration\nPlease login")
      document.location.reload();
      //this.router.navigate(["login-registraion-page"]);
    }, error => {
      alert("An error occurred");
      console.log(error)
      this.router.navigate(["login-registraion-page"])
    })
  }

  updateUser(user: UserDTO){
    this.http.put("http://localhost:8080/user", JSON.stringify(user), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8')
    }).subscribe(user => {
      alert("Update successful!");
      //this.router.navigate(["login-registraion-page"]);
    }, error => {
      alert("An error occurred");
      console.log(error)
      //document.location.reload();
    })
  }

}