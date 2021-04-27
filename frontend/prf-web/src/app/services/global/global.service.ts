import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  shoppingCartChangeEmitter: EventEmitter<any> = new EventEmitter();
  productChangeEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  changeCart() {
    this.shoppingCartChangeEmitter.emit();
  }

  getCart() {
    let cart = JSON.parse(localStorage.getItem('cart') as string);
    if (!cart) {
      let c = { products: [] };
      localStorage.setItem('cart', JSON.stringify(c));
    }
    cart = JSON.parse(localStorage.getItem('cart') as string);
    return cart;
  }

  addToCart(productId: string) {
    let cart = this.getCart();
    cart.products.push({ time: Date.now(), productId: productId });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  changeProduct() {
    this.productChangeEmitter.emit();
  }
}
