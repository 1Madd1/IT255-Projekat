import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { ComputersComponent } from './computers/computers.component';
import { ComponentsComponent } from './components/components.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { LoginRegistrationPageComponent } from './login-registration-page/login-registration-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './ngrx/simple.reducer';

const routes: Routes = [
  // osnovne rute
  { path: '', redirectTo: '/login-registraion-page', pathMatch: 'full' },
  { path: 'login-registraion-page', component: LoginRegistrationPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'computers', component: ComputersComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'payment-page', component: PaymentPageComponent },
  { path: 'about-us', component: AboutUsComponent }]

  /**
   * const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
 ]; za rutiranje po id, prvo se importuje
 import { ActivatedRoute } from '@angular/router';
 pa se inject-uje
 export class ProductComponent {
  id: string;
 constructor(private route: ActivatedRoute) {
  route.params.subscribe(params => { this.id = params['id']; });
  }
}
   */

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComputersComponent,
    ComponentsComponent,
    AboutUsComponent,
    HomeComponent,
    PaymentPageComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({message: simpleReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }