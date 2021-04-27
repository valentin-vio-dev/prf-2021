import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/oder/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;

  constructor(
    private toastService: ToastService,
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAll().subscribe((res: any) => {
      this.orders = res.data.orders;
      this.orders.forEach(order => {
        order.orders.forEach((prod: any) => {
          order.products = [];
          this.productService.getById(prod.productId).subscribe((resP: any) => {
            order.products.push(resP.data.product);
          });
        });
        this.userService.getUserById(order.customerId).subscribe((re: any) => {
          order.customer = re.data.user;
        });
      });
    });
  }

  getTotalPrice(order: any) {

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
    p = p.reverse();
    return p.join('');
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
