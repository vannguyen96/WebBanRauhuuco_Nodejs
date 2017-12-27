import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-danhsachdonhang',
  templateUrl: './danhsachdonhang.component.html',
  styleUrls: ['./danhsachdonhang.component.css']
})
export class DanhsachdonhangComponent implements OnInit {
  list = [];
  messageClass;
  message;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { 
    this.createNewListForm();
    this.getlistdonhang();
  }
  createNewListForm() {
    this.form = new FormGroup({

    });
  }

  getlistdonhang(){
    this.adminService.getdonhang().subscribe(data =>{
      if (!data) {
        console.log('err');
      }
      else {
        this.list = data;   
         
      }
    })
  }
  ngOnInit() {
  }

}
