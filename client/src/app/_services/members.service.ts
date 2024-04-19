import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  getMembers(){
    return this.httpClient.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username:string){
    return this.httpClient.get<Member>(`${this.baseUrl}users/${username}`);
  }
}
