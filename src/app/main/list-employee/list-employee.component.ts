import { Component, OnInit } from '@angular/core';
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
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
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
  formDataEmployee: Employee;
  Subjects: Subject[];
  Subject: Subject;
  Employee: Employee;
  constructor(public service: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.getEmployees();
  }
  onSubmit(form: NgForm) {
    this.insertRecord(form);
    this.toastr.success('Thông báo', 'Thao tác thành công');
    if (form.value.employeeId == null) this.insertRecord(form);
    else this.updateRecord(form);
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
      role: '',
    };
  }
  insertRecord(form: NgForm) {
    //console.log('ffffffff',form.value);
    this.service.postEmployees(form.value).subscribe(
      (res) => {
        this.resetForm(form);
        this.service.getEmployees();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    //console.log('ffffffff',form.value);
    this.service.putEmployees(form.value).subscribe(
      (res) => {
        this.resetForm(form);
        this.service.getEmployees();
      },
      (err) => {
        console.log(err);
      }
    );
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
  //for chi tiết để sửa
  //Object.assign() được sử dụng để sao chép các giá trị của tất cả thuộc tính có thể liệt kê từ một hoặc nhiều đối tượng nguồn đến một đối tượng đích. Nó sẽ trả về đối tượng đích đó.
  formdetails(empl: Employee) {
    this.service.formDataEmployee = Object.assign({}, empl);
  }
  updateform(empl: Employee) {
    this.service.formDataEmployee = Object.assign({}, empl);
  }
  updateValue(value: any) {
    this.subsl = value;
  }
  delete(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa không')) {
      this.service.deleteEmployees(id).subscribe((res) => {
        this.service.getEmployees();
        this.toastr.warning('Thông báo', 'Thao tác thành công');
      });
    }
  }
}
