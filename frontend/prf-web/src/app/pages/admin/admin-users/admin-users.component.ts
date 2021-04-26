import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private panelService: PanelService
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

  addUser() {
    this.panelService.create(AdminUserAddEditComponent);
    this.closedSub = this.panelService.afterClosed().subscribe((res: any) => {
      this.closedSub.unsubscribe();
      if (res == 'ADDED') {
        this.getUsers();
      }
    });
  }

}
