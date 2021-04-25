import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ToastService } from 'src/app/services/toast/toast.service';
import { validEmail } from 'src/app/shared/functions/email.validate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  regForm: FormGroup | any;

  constructor(private toastService: ToastService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.regForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastService.create('Please fill all required fields!', 2000);
      return;
    }

    if (!validEmail(this.loginForm.get('email').value)) {
      this.toastService.create('Please enter a valid email!', 2000);
      return;
    }

    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((res: any) => {
      localStorage.setItem('uid', res.data.user._id);
      this.toastService.create(res.message, 2000);
      this.loginForm.reset();
      this.router.navigate(['home']);
    }, (err: any) => {
      this.toastService.create(err.error.message, 2000);
    });
  }

  registrate() {
    if (this.regForm.invalid) {
      this.toastService.create('Please fill all required fields!', 2000);
      return;
    }

    if (!validEmail(this.regForm.get('email').value)) {
      this.toastService.create('Please enter a valid email!', 2000);
      return;
    }

    this.auth.registrate(this.regForm.value).subscribe((res: any) => {
      this.toastService.create(res.message, 2000);
      this.regForm.reset();
    }, (err: any) => {
      this.toastService.create(err.error.message, 2000);
    });
  }

}
