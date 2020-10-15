import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { TypeComponent } from './type/type.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ 
    ProductComponent,TypeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'type',
        component: TypeComponent,
      },
  ]),  
  ]
})
export class ProductModule { }
