import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editloaisanpham',
  templateUrl: './editloaisanpham.component.html',
  styleUrls: ['./editloaisanpham.component.css']
})
export class EditloaisanphamComponent implements OnInit {
  id_loaisp;
  messageClass;
  message;
  name;
  hinhanh;
  list = [];
  form: FormGroup;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private activeRroute: ActivatedRoute
  ) {
    this.createNewAddLoaiSanPhamForm();
    this.getthongtinsp();
  
   }
   createNewAddLoaiSanPhamForm() {
    this.form = this.formBuilder.group({
      // Title field
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])],
      // Body field
      hinhanh: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }
  getthongtinsp(){
    this.activeRroute.params.subscribe((params: any) =>{
      this.adminService.getsualoaisp(params.id).subscribe(data =>{
        if (!data) {
          console.log('err');
        }
        else {
          this.list = data;  
          this.name = this.list[0].tenloaisanpham;
          this.hinhanh = this.list[0].hinhanhloaisanpham;    
        }
      })
    })
  } 
  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['hinhanh'].disable();
  }
//mở đăng kí

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['hinhanh'].enable();
  }
  onThemspSubmit(){
    this.processing = true;
    this.disableForm();
    
    this.activeRroute.params.subscribe((params :any) =>{
      const loaisanpham = {
        name: this.form.get('name').value,
        hinhanh: this.form.get('hinhanh').value,
        id: params.id
      }
      this.adminService.sualoaisp(loaisanpham).subscribe(data =>{
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Return error class
          this.message = data.message; // Return error message
          this.enableForm();
        } else {
          this.messageClass = 'alert alert-success'; // Return success class
          this.message = data.message; // Return success message
          console.log(this.form.get('name').value);
        }
      })
    })
  }
  ngOnInit() {
   
  }

}
