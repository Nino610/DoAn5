import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { ProductService } from '../../productservice';
import { AuthenticationService } from 'src/app/lib/authentication.service';
declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  userDetails;
  employee: any;
  tmp: string;
  photo: any;
  fullname: any;
  private userSubject: BehaviorSubject<User>;
  constructor(
    private router: Router,
    private AuthenticationService: AuthenticationService,
    public service: ProductService
  ) {}
  ngOnInit(): void {
    this.employee = localStorage.getItem('employeeId');
    console.log(this.photo);
    //this.employee = 'B1001';
    this.service.getuserprofile().subscribe(
      (res) => {
        this.userDetails = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.service.getEmployeeByID(this.employee).subscribe((res) => {
      this.fullname = res;
      console.log(this.fullname);
    });
  }
  ngAfterViewInit() {
    $('#sidebar-collapse').click(function () {
      setTimeout(() => {
        let event;
        if (typeof Event === 'function') {
          event = new Event('resize');
        } else {
          event = document.createEvent('Event');
          event.initEvent('resize', true, true);
        }
        window.dispatchEvent(event);
      }, 100);
      if (!$('#sidebar').hasClass('menu-min')) {
        $('.main-content').css('padding-left', '43px');
        $('.footer-inner').css('left', '43px');
      } else {
        $('.main-content').css('padding-left', '190px');
        $('.footer-inner').css('left', '190px');
      }
    });
    setTimeout(() => {
      let event;
      if (typeof Event === 'function') {
        event = new Event('resize');
      } else {
        event = document.createEvent('Event');
        event.initEvent('resize', true, true);
      }
      window.dispatchEvent(event);
    }, 100);
    setTimeout(() => {
      $('.main-content').css('padding-left', $('#sidebar').width() + 1);
      $('.footer-inner').css('left', $('#sidebar').width() + 1);
    }, 100);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  remove() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
  changePhoto() {
    let tmp = {
      employeeId: this.employee,
      fullName: this.userDetails.fullName,
      gender: this.userDetails.gender,
      email: this.userDetails.email,
      departmentId: this.userDetails.departmentId,
      photo: this.photo,
      password: this.userDetails.password,
      phoneNumber: this.userDetails.phoneNumber,
      birthday: this.userDetails.birthday,
      address: this.userDetails.address,
    };
    this.service.update(this.employee, tmp).subscribe(
      (res) => {
        alert('Update thành công');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
