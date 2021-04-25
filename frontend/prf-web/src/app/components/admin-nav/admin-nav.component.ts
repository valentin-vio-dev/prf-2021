import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  activeLink: string = '';
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.activeLink = url[0].path;
    });
  }

  getNavs() {
    return [
      { name: 'Customers', path: '/admin/customers', label: 'customers' },
      { name: 'Catalog', path: '/admin/catalog', label: 'catalog' },
    ];
  }

}
