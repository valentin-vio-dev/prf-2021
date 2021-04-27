import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;

  constructor(
    private globalService: GlobalService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.toastService.create('Product added to your shopping cart!', 2000);
    this.globalService.addToCart(this.product._id);
    this.globalService.changeCart();
  }

}
