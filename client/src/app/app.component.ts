import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  users:any;

  constructor(private httpClient:HttpClient, private accountService:AccountService){}

  ngOnInit(): void {
      this.getUsers();
      this.setCurrentUser();
  }

  getUsers(){
    this.httpClient.get("https://localhost:5001/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed.")
    })
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user:User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
