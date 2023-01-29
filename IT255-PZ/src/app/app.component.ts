import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online PC Shop';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }


}

