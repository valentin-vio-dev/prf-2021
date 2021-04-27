import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { PageComponent } from './components/page/page.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminCatalogComponent } from './pages/admin/admin-catalog/admin-catalog.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { AddItemComponent } from './pages/admin/admin-catalog/add-item/add-item.component';
import { AdminUserAddEditComponent } from './pages/admin/admin-users/admin-user-add-edit/admin-user-add-edit.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { ProductItemComponent } from './pages/catalog/product-item/product-item.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardComponent,
    InputComponent,
    HomeComponent,
    TopNavComponent,
    PageComponent,
    CatalogComponent,
    ShoppingCartComponent,
    AdminComponent,
    NotFoundComponent,
    ExpansionPanelComponent,
    AdminNavComponent,
    AdminUsersComponent,
    AdminCatalogComponent,
    RightPanelComponent,
    AddItemComponent,
    AdminUserAddEditComponent,
    AdminOrdersComponent,
    ProductItemComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
