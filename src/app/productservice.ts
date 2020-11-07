import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from './models/employees';
import { NgForm } from '@angular/forms';
import { Subject } from './models/subjects';
@Injectable({ providedIn: 'root' })
export class ProductService {
  formData: Subject;
  formDataEmployee: Employee;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  httpClient: any;
  listEmployees: Employee[];
  listSubjects: Subject[];
  readonly apiUrl = 'https://localhost:44399';
  constructor(public http: HttpClient, private fb: FormBuilder) {}
  //register
  formModel = this.fb.group({
    username: ['', Validators.required],
    role: ['', Validators.required],
    departmentId: ['', Validators.required],
    passwords: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmpassword: ['', Validators.required],
      },
      { validator: this.comparePassword }
    ),
  });
  comparePassword(fb: FormGroup) {
    let ConfirmPasswordCheck = fb.get('confirmpassword');
    if (
      ConfirmPasswordCheck.errors == null ||
      'CheckPassGiongNhau' in ConfirmPasswordCheck.errors
    ) {
      if (fb.get('password').value != ConfirmPasswordCheck.value)
        ConfirmPasswordCheck.setErrors({ CheckPassGiongNhau: true });
      else ConfirmPasswordCheck.setErrors(null);
    }
  }
  register() {
    var body = {
      username: this.formModel.value.username,
      role: this.formModel.value.role,
      departmentId: this.formModel.value.departmentId,
      password: this.formModel.value.passwords.password,
    };
    return this.http.post(this.apiUrl + '/api/Accounts/Them', body);
  }
  //login
  login(formData) {
    console.log(formData);
    return this.http.post(this.apiUrl + '/api/Accounts/Login', formData);
  }
  // employees: giảng viên
  getEmployees() {
    this.http
      .get(this.apiUrl + '/api/Employees')
      .toPromise()
      .then((res) => (this.listEmployees = res as Employee[]));
    //console.log(this.listEmployees);
  }
  putEmployees(formDataEmployee: Employee) {
    //formData.phoneNumber = +formData.phoneNumber;
    return this.http.put(
      this.apiUrl + '/api/Employees/sua/' + formDataEmployee.employeeId,
      formDataEmployee
    );
  }
  // subject: môn học
  getSubjects() {
    this.http
      .get(this.apiUrl + '/api/Subjects')
      .toPromise()
      .then((res) => (this.listSubjects = res as Subject[]));
  }
  postSubjects(formData: Subject) {
    formData.credit = +formData.credit; //chuyển định dạng về giống trong models
    return this.http.post(this.apiUrl + '/api/Subjects/them', formData);
  }
  putSubjects(formData: Subject) {
    formData.credit = +formData.credit;
    return this.http.put(
      this.apiUrl + '/api/Subjects/sua/' + formData.subjectId,
      formData
    );
  }
  deleteSubject(id: string) {
    return this.http.delete(this.apiUrl + '/api/Subjects/xoa/' + id);
  }
}
