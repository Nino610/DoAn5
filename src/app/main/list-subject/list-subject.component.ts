import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/employees';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'src/app/models/subjects';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: '../list-subject/list-subject.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['../list-subject/list-subject.component.css'],
})
export class ListSubjectComponent implements OnInit {
  searchText;
  data: Array<any>;
  totalRecords: string;
  page: number = 1;
  foods: Food[] = [
    { value: 'HK1-2018-2019', viewValue: 'Học kỳ 1 - Năm Học 2018-2019' },
    { value: 'HK2-2018-2019', viewValue: 'Học kỳ 2- Năm Học 2018-2019' },
    { value: 'HK1-2019-2020', viewValue: 'Học kỳ 1 - Năm Học 2019-2020' },
    { value: 'HK2-2019-2020', viewValue: 'Học kỳ 2 - Năm Học 2019-2020' },
    { value: 'HK1-2020-2021', viewValue: 'Học kỳ 1 - Năm Học 2020-2021' },
    { value: 'HK2-2020-2021', viewValue: 'Học kỳ 2 - Năm Học 2020-2021' },
  ];

  Employees: Employee[];
  Employee: Employee;
  submitted: boolean;
  Subjects: Subject[];
  Subject: Subject;
  constructor(public service: ProductService, private toastr: ToastrService) {
    this.data = new Array<any>();
  }

  ngOnInit() {
    this.resetForm();
    this.service.getSubjects();
  }
  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      subjectId: '',
      subjectName: '',
      credit: 0,
      departmentId: '',
    };
  }
  onSubmit(form: NgForm) {
    if (form.value.subjectId == null) this.insertRecord(form);
    else this.updateRecord(form);
    this.toastr.success('Thông báo', 'Thao tác thành công');
  }
  insertRecord(form: NgForm) {
    //console.log('ffffffff',form.value);
    this.service.postSubjects(form.value).subscribe(
      (res) => {
        this.resetForm(form);
        this.service.getSubjects();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateform(sub: Subject) {
    this.service.formData = Object.assign({}, sub);
  }
  updateRecord(form: NgForm) {
    //console.log('ffffffff',form.value);
    this.service.putSubjects(form.value).subscribe(
      (res) => {
        this.toastr.success('Thông báo', 'Thao tác thành công');
        this.resetForm(form);
        this.service.getSubjects();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
