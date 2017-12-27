import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-danhsachsanpham',
  templateUrl: './danhsachsanpham.component.html',
  styleUrls: ['./danhsachsanpham.component.css']
})
export class DanhsachsanphamComponent implements OnInit {
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
  xoasanpham(id){
    this.adminService.xoasp(id).subscribe(data =>{
      if (!data.success) {
        
      }
      else {
        
        this.getlistsanpham();   
      }
    })
  }
  getlistsanpham(){
    this.adminService.getlistsanpham().subscribe(data =>{
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
