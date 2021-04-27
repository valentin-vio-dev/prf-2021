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

  constructor(
    private toastService: ToastService,
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
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

  complete(order: any) {
    this.orderService.updateStatus(order._id, 'package shipped').subscribe((res: any) => {
      this.toastService.create('Package shipped!', 2000);
      this.getOrders();
    }, (err: any) => {
      this.toastService.create('Something went wrong :(', 2000);
    });
  }

}
