import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { OrderService } from 'src/app/services/oder/order.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddItemComponent } from '../../admin/admin-catalog/add-item/add-item.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  @Input() type: any;
  @Input() spring: boolean = false;
  closedSub: Subscription | any;

  constructor(
    private globalService: GlobalService,
    private toastService: ToastService,
    private panelService: PanelService,
    private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
  }

  addToCart() {
    if (!this.product.available) return;

    if (this.spring) {
      this.userService.getCurrentUser().subscribe((res: any) => {
        let user = res.data.user;
        let trans = {
          full_price : this.product.price,
          product_id: this.product.id,
          date: Date.now().toString(),
          customer: user.firstname + ' ' + user.lastname,
          customer_id: user._id
        };

        this.orderService.addTransactionSpring(trans).subscribe(res => {
          this.toastService.create('Your order has been submitted!', 2000);
        }, err => {
          console.log(err);
          this.toastService.create('Something went wrong :(', 2000);
        });
      });
    } else {
      this.toastService.create('Product added to your shopping cart!', 2000);
      this.globalService.addToCart(this.product._id);
      this.globalService.changeCart();
    }
  }

  editProduct() {
    this.panelService.create(AddItemComponent, this.product, { withSpring: this.spring });
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'ADDED' || res == 'EDITED' || res == 'DELETED') {
        this.globalService.changeProduct();
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

}
