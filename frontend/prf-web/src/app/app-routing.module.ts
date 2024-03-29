import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { AdminCatalogComponent } from './pages/admin/admin-catalog/admin-catalog.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CatalogSpringComponent } from './pages/catalog-spring/catalog-spring.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog-spring',
    component: CatalogSpringComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard, AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'users', 
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: AdminUsersComponent,
        canActivate: [AdminGuard, AuthGuard],
      },
      {
        path: 'catalog',
        component: AdminCatalogComponent,
        canActivate: [AdminGuard, AuthGuard]
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
        canActivate: [AdminGuard, AuthGuard]
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
