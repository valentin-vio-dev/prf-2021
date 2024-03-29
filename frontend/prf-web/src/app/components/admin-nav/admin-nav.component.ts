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
      { name: 'Users', path: '/admin/users', label: 'users', icon: 'perm_identity' },
      { name: 'Catalog', path: '/admin/catalog', label: 'catalog', icon: 'store' },
      { name: 'Orders', path: '/admin/orders', label: 'orders', icon: 'view_list' },
    ];
  }

}
