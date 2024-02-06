import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {
      this.httpClient.get("https://localhost:5001/api/users").subscribe({
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log("Request has completed.")
      })
  }

  title = 'client';
  users:any;
}