import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product: any) {
    return this.http.post('http://localhost:3000/product', product);
  }

  getAll() {
    return this.http.get('http://localhost:3000/product');
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/product', { body: { _id: id } } as any);
  }

  editProduct(id: string, product: any) {
    let body = product;
    body._id = id;
    return this.http.put('http://localhost:3000/product', body);
  }
}
