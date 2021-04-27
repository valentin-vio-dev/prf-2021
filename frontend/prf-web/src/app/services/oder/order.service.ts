import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTE } from 'src/app/shared/const/backend.urls';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  order(address: any, orders: any[]) {
    return this.http.post(ROUTE.ORDER.ORDER, {
      customerId: localStorage.getItem('uid'),
      address: address,
      orders: orders,
      added: Date.now()
    });
  }

  getAllByCurrent() {
    return this.http.get(ROUTE.ORDER.GET_ALL_BY_CURRENT_USER + localStorage.getItem('uid'));
  }

  getAll() {
    return this.http.get(ROUTE.ORDER.GET_ALL)
  }

  updateStatus(id: string, status: string) {
    return this.http.put(ROUTE.ORDER.UPDATE_STATUS, { id: id, status: status });
  }
}
