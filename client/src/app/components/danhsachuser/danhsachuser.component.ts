import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-danhsachuser',
  templateUrl: './danhsachuser.component.html',
  styleUrls: ['./danhsachuser.component.css']
})
export class DanhsachuserComponent implements OnInit {
  list = [];
  messageClass;
  message;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    this.createNewListForm();
    this.getlistuser();
   }
  createNewListForm() {
    this.form = new FormGroup({
    
    });
  }
  getlistuser(){
    this.adminService.getlistuser().subscribe(data =>{
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
