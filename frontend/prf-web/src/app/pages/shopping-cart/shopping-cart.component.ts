import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { OrderService } from 'src/app/services/oder/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: any[] = [];
  form: FormGroup | any;
  loading = false;

  constructor(
    public globalService: GlobalService,
    public productService: ProductService,
    private router: Router,
    private toastService: ToastService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.form = new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required)
    });
  }

  getProducts() {
    this.loading = true;
    let i = 0;
    this.products = [];
    let products = this.globalService.getCart().products;
    products.forEach((product: any) => {
      this.productService.getById(product.productId).subscribe((res: any) => {
        let nProd = res.data.product;
        nProd.items = product.items;
        this.products.push(nProd)
        i++;
        if (i == products.length) {
          this.loading = false;
        }
      });
    });

    if (products.length < 1) {
      this.loading = false;
    }
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
    if (this.form.invalid) {
      this.toastService.create('Please fill all required field!', 2000);
      return;
    }

    this.loading = true;

    let orders: any[] = [];
    this.products.forEach((product: any) => {
      orders.push({ productId: product._id, quantity: product.items });
    });
    
    this.orderService.order(this.form.value, orders).subscribe((res: any) => {
      this.toastService.create('Your order has been submitted!', 2000);
      this.loading = false;
      localStorage.setItem('cart', JSON.stringify({ products: [] }));
    }, (err: any) => {
      this.loading = false;
      this.toastService.create('Someting went wrong :(', 2000);
    });
  }
}
