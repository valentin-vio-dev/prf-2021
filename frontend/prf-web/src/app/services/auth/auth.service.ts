import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROUTE } from 'src/app/shared/const/backend.urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(ROUTE.AUTH.LOGIN, { email: email, password: password });
  }

  logout() {
    localStorage.setItem('cart', JSON.stringify({ products: [] }));
    localStorage.removeItem('uid');
  }

  registrate(user: any) {
    return this.http.post(ROUTE.AUTH.REGISTRATE, user);
  }

  getCurrentUserId() {
    return localStorage.getItem('uid') || null;
  }
}
