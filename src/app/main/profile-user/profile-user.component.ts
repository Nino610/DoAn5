import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../productservice';
import { Employee } from 'src/app/models/employees';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
})
export class ProfileUserComponent implements OnInit {
  userDetails;
  constructor(
    public service: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  Employee: Employee[];

  ngOnInit() {
    //JSON.stringify(this.service.getuserprofile());

    this.service.getuserprofile().subscribe(
      (res) => {
        this.userDetails = res;
        //this.userDetails = this.service.formDataEmployee;
        console.log(res);
        //console.log(this.service.formDataEmployee);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    //console.log('ffffffff',form.value);
    this.service.putuserprofile(form.value).subscribe(
      (res) => {
        this.userDetails = res;
        this.userDetails = this.service.formDataEmployee;
        this.resetForm(form);
        this.service.getuserprofile();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formDataEmployee = {
      employeeId: '',
      departmentId: '',
      fullName: '',
      gender: true,
      birthday: '',
      address: '',
      email: '',
      phoneNumber: '',
      password: '',
      photo: '',
      token: '',
      role: '',
    };
  }
  updateform(sub: Employee) {
    this.service.formDataEmployee = Object.assign({}, sub);
  }
  onSubmit(form: NgForm) {
    //this.insertRecord(form);
    //this.toastr.success('Thông báo', 'Thao tác thành công');
    this.updateRecord(form);
  }
}
