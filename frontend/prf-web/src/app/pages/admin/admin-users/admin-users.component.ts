import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { UserService } from 'src/app/services/user/user.service';
import { AdminUserAddEditComponent } from './admin-user-add-edit/admin-user-add-edit.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  closedSub: Subscription | any;

  constructor(
    private userService: UserService,
    private panelService: PanelService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUser().subscribe((res: any) => {
      this.users = res.data.users
    });
  }

  getCustomers() {
    return this.users.filter(user => {
      return user.accessLevel == 'user';
    });
  }

  getAdmins() {
    return this.users.filter(user => {
      return user.accessLevel == 'admin';
    });
  }

  addAdmin() {
    this.panelService.create(AdminUserAddEditComponent, { accessLevel: 'admin', editing: false });
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'ADDED') {
        this.getUsers();
      }
    });
  }

  addUser() {
    this.panelService.create(AdminUserAddEditComponent, { accessLevel: 'user', editing: false });
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'ADDED') {
        this.getUsers();
      }
    });
  }

  editUser(user: any) {
    this.panelService.create(AdminUserAddEditComponent, { user: user, editing: true });
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'EDITED' || res == 'DELETED') {
        this.getUsers();
      }
    });
  } 

}
