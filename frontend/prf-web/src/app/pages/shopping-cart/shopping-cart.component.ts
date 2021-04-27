import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: any[] = [];

  constructor(
    public globalService: GlobalService,
    public productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = [];
    let products = this.globalService.getCart().products;
    products.forEach((product: any) => {
      this.productService.getById(product.productId).subscribe((res: any) => {
        let nProd = res.data.product;
        nProd.items = product.items;
        this.products.push(nProd)
      });
    });
  }

  goToCatalog() {
    this.router.navigate(['catalog']);
  }

  remove(product: any) {
    let cart = this.globalService.getCart();
    cart.products = cart.products.filter((prod: any) => {
      return prod.productId != product._id;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    this.getProducts()
    this.toastService.create('Product removed!', 2000);
  }

  getFormatedPrice(price: any) {
    let st: string = price.toString();
    st = st.trim();
    let p = [];
   
    let c = 1;
    for (let i=st.length-1; i>=0; i--) {
      p.push(st.charAt(i));
      if (c % 3 == 0 && i != 0) {
        p.push('.');
      }
      c += 1;
    }
    p = p.reverse()
    return p.join('');
  }

  getTotalPrice() {
    let sum = 0;
    this.products.forEach(product => {
      sum += product.price * product.items; 
    });
    return this.getFormatedPrice(sum);
  }

  order() {
    
  }
}
