import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTE } from 'src/app/shared/const/backend.urls';
import { SPRING_ROUTE } from 'src/app/shared/const/spring.urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product: any) {
    return this.http.post(ROUTE.PRODUCT.ADD, product);
  }

  getAll() {
    return this.http.get(ROUTE.PRODUCT.GET_ALL);
  }

  getById(id: string) {
    return this.http.get(ROUTE.PRODUCT.GET_BY_ID + id);
  }

  search(search: string) {
    return this.http.get(ROUTE.PRODUCT.SEARCH + search.toLowerCase());
  }

  delete(id: string) {
    return this.http.delete(ROUTE.PRODUCT.DELETE, { body: { _id: id } } as any);
  }

  editProduct(id: string, product: any) {
    let body = product;
    body._id = id;
    return this.http.put(ROUTE.PRODUCT.EDIT, body);
  }

  /*------------ SPRING ------------------*/

  getAllSpring() {
    return this.http.get(SPRING_ROUTE.PRODUCT.GET_ALL);
  }

  addProductSpring(product: any) {
    return this.http.post(SPRING_ROUTE.PRODUCT.ADD, product, { responseType: 'text' });
  }

  getByIdSpring(id: string) {
    return this.http.get(SPRING_ROUTE.PRODUCT.GET_BY_ID + id);
  }

  deleteSpring(id: string) {
    return this.http.delete(SPRING_ROUTE.PRODUCT.DELETE + id, { responseType: 'text' });
  }

  editProductSpring(id: any, product: any) {
    let body = Object.assign({}, product);
    body.id = id;
    return this.http.put(SPRING_ROUTE.PRODUCT.UPDATE, body, { responseType: 'text' });
  }
}
