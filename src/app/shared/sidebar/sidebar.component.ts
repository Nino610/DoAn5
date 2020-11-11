import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { ProductService } from '../../productservice';
declare let $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  userDetails;
  private userSubject: BehaviorSubject<User>;
  public menus = [
    {
      name: 'Người dùng',
      url: '',
      icon: 'user',
      childs: [
        { name: 'Quản lý người dùng', url: 'user/user' },
        { name: 'Đăng xuất', url: '' },
        { name: 'Đăng nhập', url: '/login' },
      ],
    },
    {
      name: 'Hàng hóa',
      url: '',
      icon: 'signal',
      childs: [
        { name: 'Quản lý đơn hàng', url: '/product/order' },
        { name: 'Quản lý loại hàng', url: '/product/type' },
        { name: 'Quản lý sản phẩm', url: '/product/product' },
      ],
    },
  ];
  constructor(private router: Router, public service: ProductService) {}
  ngOnInit(): void {
    this.service.getuserprofile().subscribe(
      (res) => {
        this.userDetails = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
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
}
