import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'http://localhost:3000/enquiry';

  constructor(private http: HttpClient) { }

  postRegistration(registerObj: User){
    return this.http.post(`${this.baseUrl}`, registerObj);
  }

  getRegistration(){
    return this.http.get(`${this.baseUrl}`);
  }

  updateRegistration(id: number, registerObj: User){
    return this.http.put(`${this.baseUrl}/${id}`, registerObj);
  }

  deleteRegistration(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getRegistrationUserId(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
