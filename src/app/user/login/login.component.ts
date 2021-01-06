import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../productservice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  formModel = {
    employeeId: '',
    password: '',
  };
  employeeId: string;
  constructor(
    private service: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    //nếu đã dăng nhập sẽ được chuyển sang trang chủ
    if (localStorage.getItem('token') != null) this.router.navigateByUrl('/');
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('');
        this.employeeId = form.value.employeeId;
        localStorage.setItem('employeeId', this.employeeId);
      },
      (err) => {
        if (err.status === 400)
          this.toastr.error(
            'Sai tên tài khoản hoặc mật khẩu',
            'Đăng nhập thất bại'
          );
        else console.log(err);
      }
    );
  }
}
