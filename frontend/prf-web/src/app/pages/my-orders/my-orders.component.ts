import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/oder/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  loading = false;

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAllByCurrent().subscribe((res: any) => {
      this.orders = res.data.orders;
      let i = 0;
      this.orders.forEach(order => {
        order.orders.forEach((prod: any) => {
          order.products = [];
          this.productService.getById(prod.productId).subscribe((resP: any) => {
            order.products.push(resP.data.product);
            i++;

            if (i == this.orders.length) {
              this.loading = false;
            }
          }, (err: any) => {
            i++;
            order.products.push({ name: 'Not found!' });

            if (i == this.orders.length) {
              this.loading = false;
            }
          });
        });
      });

      if (this.orders.length < 1) {
        this.loading = false;
      }
    });
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

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
