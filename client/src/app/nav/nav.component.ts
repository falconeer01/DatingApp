import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbDropdownModule, RouterLink, ToastrModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    public accountService:AccountService,
    private router:Router,
    private toastrService:ToastrService
  ){}

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  login(){
    this.accountService.login(this.loginForm).subscribe({
      next: () => this.router.navigateByUrl("/members"),
      error: error => this.toastrService.error(error.error)
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

  getUserName(): string | null {
    let currentUserStr = localStorage.getItem('user');

    if (currentUserStr !== null) {
      let currentUser = JSON.parse(currentUserStr);
      return currentUser.userName;
    } else {
      return null;
    }
  }

  ngOnInit(): void {
  }
}
