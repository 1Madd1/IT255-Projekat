import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface AppState {
  message: string;
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  user: User;
  message$: Observable<string>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.message$ = this.store.select('message');
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') as any) || [];
    if(Object.keys(this.user).length == 0 || this.user == null){
      this.router.navigate(['login-registraion-page']);
    }
    localStorage.clear();
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login-registraion-page']);
  }

  showHistoryInfo() {
    this.store.dispatch({type: 'HISTORY'});
  }

  showSocialInfo() {
    this.store.dispatch({type: 'SOCIAL'});
  }

}
