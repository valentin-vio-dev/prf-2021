import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(address: any, orders: any[]) {
    return this.http.post('http://localhost:3000/order', {
      customerId: localStorage.getItem('uid'),
      address: address,
      orders: orders,
      added: Date.now()
    });
  }

  getAllByCurrent() {
    return this.http.get('http://localhost:3000/order/customer?id=' + localStorage.getItem('uid'))
  }
}
