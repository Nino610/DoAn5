import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Phieukhaosat1Component } from './phieukhaosat1/phieukhaosat1.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [Phieukhaosat1Component],
  imports: [
    SharedModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule,
    InputTextareaModule,
    RouterModule.forChild([
      {
        path: 'questionnaire-1/:id',
        component: Phieukhaosat1Component,
      },
    ]),
  ],
})
export class QuestionnaireModule {}
