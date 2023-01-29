import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginRegistrationPageComponent } from './login-registration-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginRegistrationPageComponent', () => {
  let component: LoginRegistrationPageComponent;
  let fixture: ComponentFixture<LoginRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegistrationPageComponent ],
      imports: [BrowserModule, FormBuilder, FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
