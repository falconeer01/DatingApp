import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(
    private formBuilder:FormBuilder,
    private accountService:AccountService
  ){}

  isLoggedIn = false;

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  })

  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next: user => this.isLoggedIn = !!user, // "!!" ile user nesnesi boolean olur.
      error: error => console.log(error)
    })
  }

  login(){
    this.accountService.login(this.loginForm).subscribe({
      next: response => {
        console.log(response);
        this.isLoggedIn = true;
      },
      error: error => console.log(error)
    })
  }

  logout(){
    this.accountService.logout();
    this.isLoggedIn = false;
  }

  onSubmit(){
    this.login();
  }
}
