import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global/global.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AddItemComponent } from '../../admin/admin-catalog/add-item/add-item.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  @Input() type: any;
  closedSub: Subscription | any;

  constructor(
    private globalService: GlobalService,
    private toastService: ToastService,
    private panelService: PanelService
  ) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.toastService.create('Product added to your shopping cart!', 2000);
    this.globalService.addToCart(this.product._id);
    this.globalService.changeCart();
  }

  editProduct() {
    this.panelService.create(AddItemComponent, this.product);
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'ADDED' || res == 'EDITED' || res == 'DELETED') {
        this.globalService.changeProduct();
      }
    });
  }

}
