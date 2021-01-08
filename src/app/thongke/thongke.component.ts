import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/employees';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'src/app/models/subjects';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css'],
})
export class ThongkeComponent implements OnInit {
  CLassid: string;
  Subjectid: string;
  EmployeeId: string;
  data: Array<any>;
  constructor(public service: ProductService, private toastr: ToastrService) {
    this.data = new Array<any>();
  }

  ngOnInit(): void {
    this.service.getClass();
    this.service.getEmployees();
    this.service.getSubjects();
    this.service.getThongKe(this.CLassid, this.EmployeeId, this.Subjectid);
  }
}
