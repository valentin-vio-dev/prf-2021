import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss']
})
export class AdminCustomersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((res: any) => {
      this.users = res.data.users
    });
  }

}
