import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { TopNavComponent } from 'src/app/components/top-nav/top-nav.component';
import { GlobalService } from 'src/app/services/global/global.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.scss']
})
export class AdminCatalogComponent implements OnInit {
  products: any[] = [];
  closedSub: Subscription | any;

  constructor(
    private panelService: PanelService,
    private productService: ProductService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.globalService.productChangeEmitter.subscribe(() => {
      this.getProducts();
    })
  }

  addCatalogItem() {
    this.panelService.create(AddItemComponent);
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'ADDED') {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getAll().subscribe((res: any) => {
      this.products = res.data.products;
    });
  }

}
