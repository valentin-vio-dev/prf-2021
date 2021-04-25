import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', { email: email, password: password });
  }

  logout() {
    localStorage.removeItem('uid');
  }

  registrate(user: any) {
    return this.http.post('http://localhost:3000/auth/registrate', user);
  }

  getCurrentUserId() {
    return localStorage.getItem('uid') || null;
  }
}
