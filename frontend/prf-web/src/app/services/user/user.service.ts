import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getCurrentUser() {
    return this.http.get('http://localhost:3000/user/user?id=' + this.auth.getCurrentUserId() as string);
  }

  getUserById(id: string) {
    return this.http.get('http://localhost:3000/user/user?id=' + id);
  }

  getAllUser() {
    return this.http.get('http://localhost:3000/user');
  }

  addUser(user: any) {
    return this.http.post('http://localhost:3000/user', user);
  }

  editUser(id: string, user: any) {
    let body = user;
    body._id = id;
    delete body.password;
    delete body.passwordAgain;
    
    return this.http.put('http://localhost:3000/user', body);
  }
}
