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
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(form: NgForm) {
    //this.insertRecord(form);
    //this.toastr.success('Thông báo', 'Thao tác thành công');
    //if (form.value.employeeId == null) this.insertRecord(form);
    //else this.updateRecord(form);
  }
}
