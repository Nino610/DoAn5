import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../productservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  formModel = {
    username: '',
    password: '',
  };
  constructor(private service: ProductService) {}

  ngOnInit(): void {}
  onSubmit(fomr: NgForm) {}
}
