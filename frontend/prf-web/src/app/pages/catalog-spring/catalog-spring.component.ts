import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-catalog-spring',
  templateUrl: './catalog-spring.component.html',
  styleUrls: ['./catalog-spring.component.scss']
})
export class CatalogSpringComponent implements OnInit {
  products: any[] = [];
  loading = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllSpring().subscribe((res: any) => {
      this.products = res;
      this.products = this.products.map(product => {
        let tmp = Object.assign({}, product);
        tmp.alcohol = parseFloat(tmp.alcohol.toFixed(2));
        return tmp;
      });
      this.loading = false;
    });
  }

}
