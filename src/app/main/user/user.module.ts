import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [UserComponent, UserComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent,
      },
  ]),  
  ]
})
export class UserModule { }
