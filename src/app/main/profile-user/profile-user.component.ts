import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../productservice';
import { Employee } from 'src/app/models/employees';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
})
export class ProfileUserComponent implements OnInit {
  userDetails;
  idst: string;
  submitted = false;
  constructor(
    public service: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private messageService: MessageService
  ) {}
  Employee: Employee[];

  ngOnInit() {
    //JSON.stringify(this.service.getuserprofile());

    this.service.getuserprofile().subscribe(
      (res) => {
        this.userDetails = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  Update() {
    this.submitted = true;
    let tmp = {
      employeeId: this.userDetails.employeeId,
      departmentId: this.userDetails.departmentId,
      fullName: this.userDetails.fullName,
      gender: this.userDetails.gender,
      birthday: this.userDetails.birthday,
      address: this.userDetails.address,
      email: this.userDetails.email,
      phoneNumber: this.userDetails.phoneNumber,
      password: this.userDetails.password,
      photo: this.userDetails.photo,
      // token?: string;
      // role: string;
    };
    this.service.update(this.userDetails.employeeId, tmp).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thông báo',
          detail: 'Sửa thông tin thành công',
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateRecord(form: NgForm) {
    //console.log('ffffffff',form.value);
    this.service.putuserprofile(form.value).subscribe(
      (res) => {
        this.userDetails = res;
        //this.userDetails = this.service.formDataEmployee;
        this.service.getuserprofile();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateform(sub: Employee) {
    this.service.formDataEmployee = Object.assign({}, sub);
  }
  onSubmit(form: NgForm) {
    //this.insertRecord(form);
    //this.toastr.success('Thông báo', 'Thao tác thành công');
    this.Update();
    this.toastr.success('Thông báo', 'Thao tác thành công');
  }
}
