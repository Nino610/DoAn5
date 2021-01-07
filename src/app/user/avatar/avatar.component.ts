import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../productservice';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  userDetails;
  imageUrl: string = '/assets/images/b1.jpg';
  fileToUpload: File = null;
  employee: any;
  photo: any;
  public message: string;
  public progress: number;
  readonly apiUrl = 'https://localhost:44399';
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, public service: ProductService) {}

  ngOnInit() {}
  changePhoto() {
    let tmp = {
      employeeId: this.employee,
      fullName: this.userDetails.fullName,
      gender: this.userDetails.gender,
      email: this.userDetails.email,
      departmentId: this.userDetails.departmentId,
      classId: this.userDetails.classId,
      class: this.userDetails.class,
      scores: this.userDetails.scores,
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
  public uploadedFiles = (files) => {
    if (files.length === 0) return;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .post(this.apiUrl + '/api/UserProfile/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload Successful';
          this.onUploadFinished.emit(event.body);
        }
      });
  };
}
