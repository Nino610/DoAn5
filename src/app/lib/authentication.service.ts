import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Employee } from '../models/employees';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<Employee>;
  public user: Observable<Employee>;
  BaseURI: string;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Employee>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Employee {
    return this.userSubject.value;
  }

  login(employeeId: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/Accounts/Login`, {
        EmployeeId: employeeId,
        Password: password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  remove() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
  // getuserprofile() {
  //   var tokenHeader = new HttpHeaders({
  //     Authorization: 'Bearer' + localStorage.getItem('token'),
  //   });
  //   return this.http.get(this.BaseURI + '/UserProfile', {
  //     headers: tokenHeader,
  //   });
  // }
}
