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
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // osnovne rute
  { path: '', redirectTo: '/computers', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'computers', component: ComputersComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'about-us', component: AboutUsComponent }]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComputersComponent,
    ComponentsComponent,
    AboutUsComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
