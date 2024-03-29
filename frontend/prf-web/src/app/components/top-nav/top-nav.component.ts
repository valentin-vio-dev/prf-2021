import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  activeLink: string = '';
  user: any;
  navs: any[] = [];
  @Input() isLogin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService,
    public auth: AuthService,
    public globalService: GlobalService
    ) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.activeLink = url[0].path;
    });

    if (!this.auth.getCurrentUserId()) return;

    this.userService.getCurrentUser().subscribe((res: any) => {
      this.user = res.data.user;
      this.navs = this.getNavs();
      if (this.user.accessLevel != 'admin') {
        this.navs = this.navs.filter(nav => {
          return nav.label != 'admin';
        });
      }
    });
  }

  getNavs() {
    return [
      { name: 'Catalog', path: '/catalog', label: 'catalog', icon: 'store' },
      { name: 'Catalog (Spring Boot)', path: '/catalog-spring', label: 'catalog-spring', icon: 'store' },
      { name: 'My orders', path: '/my-orders', label: 'my-orders', icon: 'done_all'},
      { name: 'Shopping cart', path: '/shopping-cart', label: 'shopping-cart', icon: 'shopping_cart' },
      { name: 'Admin', path: '/admin', label: 'admin', icon: 'https' }
    ];
  }

  logout() {
    this.auth.logout();
    this.toastService.create('Logged out!', 2000);
    this.router.navigate(['login']);
  }

  getPath() {
    return window.location.pathname;
  }

}
