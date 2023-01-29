import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-registration-page',
  templateUrl: './login-registration-page.component.html',
  styleUrls: ['./login-registration-page.component.css']
})
export class LoginRegistrationPageComponent implements OnInit {

  angForm: FormGroup;
  userList: any;
  constructor(private fb: FormBuilder, private userService: UserService, private http: HttpClient, private router: Router) {
    this.createForm();
  }



  ngOnInit(): void {

  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardDate: ['', Validators.required],
      cvv2: ['', Validators.required]
    });
  }

  emptyStringValidation(txt: string) {
    if (txt === null || txt === "" || txt.length === 0) {
      alert("Texts cant be empty!");
      return false;
    }
    return true;
  }

  registrationValidation(username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, cardNumber: HTMLInputElement, cardDate: HTMLInputElement, cvv2: HTMLInputElement) {
    console.log("Im here 1");
    console.log(/\s/.test(username.value));
    if (this.emptyStringValidation(username.value) && this.emptyStringValidation(email.value) && this.emptyStringValidation(password.value) && this.emptyStringValidation(cardNumber.value) && this.emptyStringValidation(cardDate.value) && this.emptyStringValidation(cvv2.value)) {
      console.log("Im here 2");
      if (this.containsWhitespace(username.value) && this.containsWhitespace(email.value) && this.containsWhitespace(password.value) && this.containsWhitespace(cardNumber.value) && this.containsWhitespace(cardDate.value) && this.containsWhitespace(cvv2.value)) {
        console.log("Im here 3");
        if (!this.creditCardValidation(cardNumber.value, cardDate.value, cvv2.value)) {
          return false;
        }
      }
    }
    return false;
  }

  containsWhitespace(txt: string): boolean {
    if (/\s/.test(txt)) {
      alert("Texts cant contain spaces!");
      return false;
    }
    return true;
  }



  textLengthValidation(txt: string): boolean {
    if (txt.length < 3 || txt.length > 30) {
      return false;
    }
    return true;
  }

  creditCardValidation(cardNumber: string, cardDate: string, cvv2: string): boolean {
    if (cardNumber.length != 19) {
      alert("Credit card number must have 16 numbers!");
      return false;
    }
    console.log(cardNumber);
    console.log(cardNumber.length);
    if (/[a-zA-Z]/.test(cardNumber) || /[a-zA-Z]/.test(cardDate) || /[a-zA-Z]/.test(cvv2)) {
      alert("Credit card number/date/cvv2 can't have letters!");
      return false;
    }
    if (!/[/]/.test(cardDate) || cardDate.length != 5) {
      alert("Invalid credit card date!");
      return false;
    }
    if (cvv2.length != 3) {
      alert("Invalid CVV2!");
      return false;
    }
    return true;
  }

  loginValidation(email: HTMLInputElement, password: HTMLInputElement): boolean {
    console.log(email.value);
    if (this.containsWhitespace(email.value) || this.containsWhitespace(password.value)) {
      return false;
    }

    return false;
  }

  signup(username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, cardNumber: HTMLInputElement, cardDate: HTMLInputElement, cvv2: HTMLInputElement) {
    if (this.registrationValidation(username, email, password, cardNumber, cardDate, cvv2)) {
      var lastId = this.userService.getMaxId();
      var newUser = {
        "id": lastId,
        "username": username.value,
        "email": email.value,
        "password": password.value,
        "creditCard": {
          "card-number": cardNumber.value,
          "card-date": cardDate.value,
          "cvv2": cvv2.value,
          "money-amount": 2000
        }
      }

      this.http.get<any>("http://localhost:3000/users").subscribe(data => {
        const checkUser = data.find((pomUser: any) => {
          return pomUser.email === newUser.email;
        });
        if (!checkUser) {
          alert("Registration successfull!");
          this.http.post<any>("http://localhost:3000/users", newUser).subscribe(data => {
            alert("Registration successfull!");
            this.router.navigate(['home']);
          });

        } else {
          alert("User with the email" + newUser.email + " already exist!");
        }
      });
    }

  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    this.http.get<any>("http://localhost:3000/users").subscribe(data => {
      const user = data.find((pomUser: any) => {
        console.log(pomUser.email);
        console.log(email.value)
        return pomUser.email === email.value && pomUser.password === password.value;
      });
      if (user) {
        alert("Login success!");
        this.router.navigate(['home']);
      } else {
        alert("Invalid email/password!");
      }
    }, err => {
      alert("Something went wrong!");
    });

  }

}
