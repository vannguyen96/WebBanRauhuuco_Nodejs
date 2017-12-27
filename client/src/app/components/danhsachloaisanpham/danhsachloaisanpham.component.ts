import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-danhsachloaisanpham',
  templateUrl: './danhsachloaisanpham.component.html',
  styleUrls: ['./danhsachloaisanpham.component.css']
})
export class DanhsachloaisanphamComponent implements OnInit {
  list = [];
  messageClass;
  message;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { 
    this.createNewListForm();
    this.getlistsanpham();
  }
  createNewListForm() {
    this.form = new FormGroup({

    });
  }
  xoaloaisanpham(id){
    this.adminService.xoaloaisp(id).subscribe(data =>{
      if (!data.success) {
        
      }
      else {
        
        this.getlistsanpham();   
      }
    })
  }
  getlistsanpham(){
    this.adminService.getlistloaisp().subscribe(data =>{
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
