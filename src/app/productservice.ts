import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/employees';
import {Subject} from './models/subjects';
import { Product } from './product';
@Injectable({providedIn: 'root'})
export class ProductService {
  formData: Subject;
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  httpClient: any;
  listEmployees: Employee[];
  listSubjects: Subject[];
  readonly apiUrl='https://localhost:44399';
  constructor(public http: HttpClient) {}
  getEmployees(){
   this.http.get(this.apiUrl +'/api/Employees').toPromise().then(res => this.listEmployees = res as Employee[])
   //console.log(this.listEmployees);
  }

 getSubjects()
 {
   this.http.get(this.apiUrl +'/api/Subjects').toPromise().then(res => this.listSubjects = res as Subject[])
 }
postSubjects(formData: Subject)
{
  formData.credit = +formData.credit;
return this.http.post(this.apiUrl +'/api/Subjects/them',formData)
}
}
