import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    productDialog: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;
    foods: Food[] = [
      {value: 'HK1-2018-2019', viewValue: 'Học kỳ 1 - Năm Học 2018-2019'},
      {value: 'HK2-2018-2019', viewValue: 'Học kỳ 2- Năm Học 2018-2019'},
      {value: 'HK1-2019-2020', viewValue: 'Học kỳ 1 - Năm Học 2019-2020'},
      {value: 'HK2-2019-2020', viewValue: 'Học kỳ 2 - Năm Học 2019-2020'},
      {value: 'HK1-2020-2021', viewValue: 'Học kỳ 1 - Năm Học 2020-2021'},
      {value: 'HK2-2020-2021', viewValue: 'Học kỳ 2 - Năm Học 2020-2021'},
    ];
    constructor(private productService: ProductService) { }

    ngOnInit() {

    }
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}
}
