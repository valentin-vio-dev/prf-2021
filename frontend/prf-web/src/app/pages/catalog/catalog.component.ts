import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: any[] = [];
  searchText: string = '';
  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAll().subscribe((res: any) => {
      this.products = res.data.products;
      this.loading = false;
    });
  }

  search(event: any) {
    if (this.searchText.trim() == '') {
      this.productService.getAll().subscribe((res: any) => {
        this.products = res.data.products;
      });
    } else {
      this.productService.search(this.searchText).subscribe((res: any) => {
        this.products = res.data.products;
      });
    }
  }

}
