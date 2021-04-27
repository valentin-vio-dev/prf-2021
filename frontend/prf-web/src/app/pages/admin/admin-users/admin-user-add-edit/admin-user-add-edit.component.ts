import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PanelService } from 'src/app/services/panel/panel.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-user-add-edit',
  templateUrl: './admin-user-add-edit.component.html',
  styleUrls: ['./admin-user-add-edit.component.scss']
})
export class AdminUserAddEditComponent implements OnInit {
  form: FormGroup | any;
  editing: boolean = false;
  userId: any;
  @ViewChild('access') accessLevel: any;

  constructor(
    private toastService: ToastService,
    private userService: UserService,
    private panelService: PanelService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl('', Validators.required),
      accessLevel: new FormControl('', Validators.required),
    });

    if (this.panelService.data) {
      this.form.patchValue(this.panelService.data.user);
      if (this.panelService.data.editing && this.panelService.data.editing == true) {
        this.editing = true;
        this.form.get('password').setValue('NULL');
        this.form.get('passwordAgain').setValue('NULL');
      }

      if (this.panelService.data.user) {
        this.userId = this.panelService.data.user._id;
      }
      
    }
  }

  ngAfterViewInit() {
    if (!this.editing) {
      this.accessLevel.nativeElement.disabled = true;
    }
  }

  deleteUser() {

  }

  submit() {
    if (this.form.invalid) {
      this.toastService.create('Please fill all required fields!', 2000);
      return;
    }

    if (this.editing) {
      this.userService.editUser(this.userId, this.form.value).subscribe((res: any) => {
        this.toastService.create(res.message, 2000);
        this.panelService.closeCurrentPanel('EDITED');
      }, (err: any) => {
        this.toastService.create(err.error.message, 2000);
      });
    } else {
      this.userService.addUser(this.form.value).subscribe((res: any) => {
        this.toastService.create(res.message, 2000);
        this.panelService.closeCurrentPanel('ADDED');
      }, (err: any) => {
        this.toastService.create(err.error.message, 2000);
      });
    }
  }

}
