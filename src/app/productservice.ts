import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Employee } from './models/employees';
import { NgForm } from '@angular/forms';
import { Subject } from './models/subjects';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({ providedIn: 'root' })
export class ProductService {
  //id = 'K1006';
  public frmstudent: any;
  private userSubject: BehaviorSubject<Employee>;
  public user: Observable<Employee>;
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
    employeeId: ['', Validators.required],
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
  //tài khoản
  getuserprofile() {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    //var name = localStorage.getItem('token');
    console.log(tokenHeader);
    return this.http.get(this.apiUrl + '/api/UserProfile', {
      headers: tokenHeader,
    });
  }
  putuserprofile(formDataEmployee: Employee) {
    var tokenHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put(
      this.apiUrl + '/api/Employees/sua/' + this.formDataEmployee.employeeId,
      {
        headers: tokenHeader,
      }
    );
  }
  // employees: giảng viên
  getEmployees() {
    this.http
      .get(this.apiUrl + '/api/Employees')
      .toPromise()
      .then((res) => (this.listEmployees = res as Employee[]));
    console.log(this.listEmployees);
  }
  putEmployees(formDataEmployee: Employee) {
    //formData.phoneNumber = +formData.phoneNumber;
    return this.http.put(
      this.apiUrl + '/api/Employees/sua/' + formDataEmployee.employeeId,
      formDataEmployee
    );
  }
  getEmployeeByID(id): Observable<any> {
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this.http
      .get('http://localhost:44399/api/Employees/' + id, {
        headers: headerOptions,
      })
      .pipe(first());
  }
  // getAllSubject() : Observable<any>{
  //   let cloneHeader: any = {};
  //   cloneHeader['Content-Type'] = 'application/json';
  //   const headerOptions = new HttpHeaders(cloneHeader);
  //   return this.http.get(this.apiUrl + '/api/Employees', { headers: headerOptions }).pipe(first());
  // }
  // subject: môn học
  getSubjects() {
    this.http
      .get(this.apiUrl + '/api/Subjects')
      .toPromise()
      .then((res) => (this.listSubjects = res as Subject[]));
  }
  getDetailsSubjects(formData: Subject) {
    this.http
      .get(this.apiUrl + '/api/Subjects' + formData.subjectId)
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
  // phiếu khảo sát
  getAllPhieuKhaoSatSv(): Observable<any> {
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this.http
      .get('http://localhost:44399/api/Questions/Sv', {
        headers: headerOptions,
      })
      .pipe(first());
  }

  GetPlanByID(id: any) {
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this.http
      .get('http://localhost:44399/api/Plans/' + id, { headers: headerOptions })
      .pipe(first());
  }

  getAllPhieuKhaoSatGv(): Observable<any> {
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this.http
      .get('http://localhost:44399/api/Questions/Gv', {
        headers: headerOptions,
      })
      .pipe(first());
  }

  postAnswer(order: any): Observable<number> {
    const url = `${this.apiUrl}/api/Answers`;
    var orderString = JSON.stringify(order);
    return this.http.post<any>(url, orderString, httpOptions);
  }

  getStudentByID(id): Observable<any> {
    let cloneHeader: any = {};
    cloneHeader['Content-Type'] = 'application/json';
    const headerOptions = new HttpHeaders(cloneHeader);
    return this.http
      .get('http://localhost:44399/api/Employees/' + id, {
        headers: headerOptions,
      })
      .pipe(first());
  }

  UpdateInfor(id, student: any): Observable<number> {
    const url = `${this.apiUrl}/api/Employees/` + id;
    var studentString = JSON.stringify(student);
    return this.http.put<any>(url, studentString, httpOptions);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/Employees/put/${id}`, data);
  }

  public get valueUser(): any {
    return this.frmstudent;
    console.log(this.frmstudent);
  }
}
