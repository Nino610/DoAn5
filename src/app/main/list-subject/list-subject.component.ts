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
import * as XLSX from 'xlsx';
import { AuthenticationService } from 'src/app/lib/authentication.service';
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
  //subsl = this.value;
  subsl: '';
  data: Array<any>;
  dataExcel: [][];
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
  submitted: boolean;
  Subjects: Subject[];
  Subject: Subject;
  constructor(
    public service: ProductService,
    private toastr: ToastrService
  ) //private authenticationService: AuthenticationService
  {
    this.data = new Array<any>();
  }

  ngOnInit() {
    this.resetForm();
    this.service.getSubjects();
    //console.log(this.authenticationService.userValue);
  }
  //import excel
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('vui lòng chọn lại');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);
      this.dataExcel = XLSX.utils.sheet_to_json(ws, { header: 1 });
    };
    reader.readAsBinaryString(target.files[0]);
    console.log(this.dataExcel);
  }
  //lựa chọn số phần tử hiển thị trên trang
  updateValue(value: any) {
    this.subsl = value;
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
    this.insertRecord(form);
    this.toastr.success('Thông báo', 'Thao tác thành công');
    if (form.value.subjectId == null) this.insertRecord(form);
    else this.updateRecord(form);
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
        this.resetForm(form);
        this.service.getSubjects();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa không')) {
      this.service.deleteSubject(id).subscribe((res) => {
        this.service.getSubjects();
        this.toastr.warning('Thông báo', 'Thao tác thành công');
      });
    }
  }
}
