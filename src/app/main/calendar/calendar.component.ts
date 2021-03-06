import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../productservice';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'src/app/models/subjects';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  productDialog: boolean;
  searchText;
  thongke = {
    subjectId: '',
    classId: '',
    employeeId: '',
  };
  //subsl = this.value;
  subsl: '';
  data: Array<any>;
  dataExcel: [][];
  totalRecords: string;
  page: number = 1;
  subjects: any[] = null;
  Subject: Subject;
  submitted: boolean;
  CLassid: string;
  Subjectid: string;
  EmployeeId: string;
  foods: Food[] = [
    { value: 'HK1-2018-2019', viewValue: 'Học kỳ 1 - Năm Học 2018-2019' },
    { value: 'HK2-2018-2019', viewValue: 'Học kỳ 2- Năm Học 2018-2019' },
    { value: 'HK1-2019-2020', viewValue: 'Học kỳ 1 - Năm Học 2019-2020' },
    { value: 'HK2-2019-2020', viewValue: 'Học kỳ 2 - Năm Học 2019-2020' },
    { value: 'HK1-2020-2021', viewValue: 'Học kỳ 1 - Năm Học 2020-2021' },
    { value: 'HK2-2020-2021', viewValue: 'Học kỳ 2 - Năm Học 2020-2021' },
  ];
  constructor(public service: ProductService, private toastr: ToastrService) {}

  ngOnInit() {
    this.service.getClass();
    this.service.getEmployees();
    this.service.getSubjects();
    this.service.getThongKe(this.CLassid, this.EmployeeId, this.Subjectid);
    // this.service.getAllSubject().subscribe((res) => {
    //   this.subjects = res;
    // });
  }

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
  onSubmit(form: NgForm) {
    // this.insertRecord(form);
    // this.toastr.success('Thông báo', 'Thao tác thành công');
    // if (form.value.subjectId == null) this.insertRecord(form);
    // else this.updateRecord(form);

    this.service.getThongKe(this.CLassid, this.Subjectid, this.EmployeeId);
    console.log(this.thongke);
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
  formdetails(sub: Subject) {
    this.service.formData = Object.assign({}, sub);
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
