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
    let found = false;
    for (let i=0; i<cart.products.length; i++) {
      if (productId == cart.products[i].productId) {
        cart.products[i].items = cart.products[i].items + 1;
        found = true;
        break;
      }
    }
    
    if (!found) {
      cart.products.push({ time: Date.now(), productId: productId, items: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  changeProduct() {
    this.productChangeEmitter.emit();
  }
}
