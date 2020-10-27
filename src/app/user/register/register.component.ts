import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../productservice';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  constructor(public service: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  onRegister() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeded) {
          this.service.formModel.reset();
        } else {
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.toastr.success('Thông báo', 'Thao tác thành công');
  }
}
