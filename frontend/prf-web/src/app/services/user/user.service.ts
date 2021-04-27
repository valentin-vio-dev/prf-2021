import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTE } from 'src/app/shared/const/backend.urls';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getCurrentUser() {
    return this.http.get(ROUTE.USER.GET_BY_ID + this.auth.getCurrentUserId() as string);
  }

  getUserById(id: string) {
    return this.http.get(ROUTE.USER.GET_BY_ID + id);
  }

  getAllUser() {
    return this.http.get(ROUTE.USER.GET_ALL);
  }

  addUser(user: any) {
    return this.http.post(ROUTE.USER.ADD, user);
  }

  editUser(id: string, user: any) {
    let body = user;
    body._id = id;
    delete body.password;
    delete body.passwordAgain;
    
    return this.http.put(ROUTE.USER.EDIT, body);
  }
}
