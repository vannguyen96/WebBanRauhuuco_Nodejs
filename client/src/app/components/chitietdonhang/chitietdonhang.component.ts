import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chitietdonhang',
  templateUrl: './chitietdonhang.component.html',
  styleUrls: ['./chitietdonhang.component.css']
})
export class ChitietdonhangComponent implements OnInit {
  list = [];
  chitiet= [];
  messageClass;
  message;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private activeRroute: ActivatedRoute
  ) { 
    this.createNewListForm();
    this.getlistdonhang();
    this.getchitietdonhang();
  }
  createNewListForm() {
    this.form = new FormGroup({

    });
  }
  getlistdonhang(){
    this.activeRroute.params.subscribe((params: any) =>{
      this.adminService.getdonhangcanxem(params.id).subscribe(data =>{
        if (!data) {
          console.log('err');
        }
        else {
          this.list = data;   
           
        }
      })
    })
  }
  getchitietdonhang(){
    this.activeRroute.params.subscribe((params: any) =>{
      this.adminService.getchitietdonhang(params.id).subscribe(data =>{
        if (!data) {
          console.log('err');
        }
        else {
          this.chitiet = data;   
           
        }
      })
    })
  }
  thanhtoanhoadon(id){
    this.adminService.thanhtoanhoadon(id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
       
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        this.getchitietdonhang();
        this.getlistdonhang();
      }
    })
  }
  ngOnInit() {
  }

}
