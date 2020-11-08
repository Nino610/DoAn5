import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../productservice';
import { Employee } from 'src/app/models/employees';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
})
export class ProfileUserComponent implements OnInit {
  constructor(public service: ProductService, private toastr: ToastrService) {}
  Employee: Employee[];
  ngOnInit(): void {
    this.service.getEmployees();
  }

  onSubmit(form: NgForm) {
    //this.insertRecord(form);
    //this.toastr.success('Thông báo', 'Thao tác thành công');
    //if (form.value.employeeId == null) this.insertRecord(form);
    //else this.updateRecord(form);
  }
}
