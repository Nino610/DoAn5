import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../productservice';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-phieukhaosat1',
  templateUrl: './phieukhaosat1.component.html',
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.5em;
      }
    `,
  ],
  styleUrls: ['./phieukhaosat1.component.css'],
  providers: [DatePipe, MessageService],
})
export class Phieukhaosat1Component implements OnInit {
  public id: string;
  nhanxet: string;
  obj: any = {};
  phieukhaosats: any[] = null;
  employeeId: string = '';
  planID: string = '';
  answervalue: any;
  answer: any;
  value: any[] = [];
  questionId: any;
  idques: any[] = [];
  constructor(
    private readonly phieuKhaoSatService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}
  complete(): void {
    for (let ans of this.phieukhaosats) {
      this.value.push(ans.answervalue);
      this.idques.push(ans.questionId);
    }
    console.log(this.value);
    console.log(this.idques);

    var answer = {
      employeeId: this.employeeId,
      PlanID: this.id,
      value: JSON.stringify(this.value),
      questionId: JSON.stringify(this.idques),
    };
    console.log(answer);

    this.phieuKhaoSatService
      .postAnswer(answer)
      .pipe(first())
      .subscribe((res) => {
        if (res > 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thông báo',
            detail: 'Khảo sát thành công',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 1000);
        }
      });
  }

  ngOnInit(): void {
    this.phieuKhaoSatService.getAllPhieuKhaoSatSv().subscribe((res) => {
      this.phieukhaosats = res;

      for (let item of this.phieukhaosats) {
        this.value.push();
      }
    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.phieuKhaoSatService.GetPlanByID(this.id).subscribe((res) => {
      this.obj = res;
    });
  }
}
