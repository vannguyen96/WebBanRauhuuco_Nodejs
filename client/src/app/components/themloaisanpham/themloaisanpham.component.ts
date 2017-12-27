import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-themloaisanpham',
  templateUrl: './themloaisanpham.component.html',
  styleUrls: ['./themloaisanpham.component.css']
})
export class ThemloaisanphamComponent implements OnInit {
  messageClass;
  message;
  form: FormGroup;
  processing = false;
  tenloaispValid;
  tenloaispMessage;


  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { 
    this.createNewAddLoaiSanPhamForm();
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
  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['hinhanh'].disable();
  }
//mở đăng kí

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['hinhanh'].enable();
  }
  onThemspSubmit()
  {
    this.processing = true;
    this.disableForm();
    const loaisanpham = {
      tenloaisanpham: this.form.get('name').value,
      hinhanhloaisanpham: this.form.get('hinhanh').value
    }
    this.adminService.themloaisp(loaisanpham).subscribe(data => {
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
  }
  checktenloaisp() {
    this.adminService.checktenloaisp(this.form.get('name').value).subscribe(data =>{
      if (!data.success) {
        this.tenloaispValid = false; // Return email as invalid
        this.tenloaispMessage = data.message; // Return error message
      } else {
        this.tenloaispValid = true; // Return email as valid
        this.tenloaispMessage = data.message; // Return success message
      }
    })
  }
  ngOnInit() {
  }

}
