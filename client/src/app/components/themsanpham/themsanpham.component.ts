import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-themsanpham',
  templateUrl: './themsanpham.component.html',
  styleUrls: ['./themsanpham.component.css']
})
export class ThemsanphamComponent implements OnInit {
  messageClass;
  message;
  form: FormGroup;
  processing = false;

  tenloaispValid;
  tenloaispMessage;
  list = [];
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { 
    this.createNewAddSanPhamForm();
    this.getlistloaisp();
  }
  createNewAddSanPhamForm() {
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
      ])],
      gia: ['', Validators.compose([
        Validators.required,
        Validators.min(0)
      ])],
      donvitinh: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])],
      loaisp: ['', Validators.compose([
        Validators.required
      ])],
      mota: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])],
    })
  }
  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['hinhanh'].disable();
    this.form.controls['gia'].disable();
    this.form.controls['donvitinh'].disable();
    this.form.controls['loaisp'].disable();
    this.form.controls['hinhanh'].disable();
    
    this.form.controls['mota'].disable();
  }
//mở đăng kí

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['hinhanh'].enable();
    this.form.controls['gia'].enable();
    this.form.controls['donvitinh'].enable();
    this.form.controls['loaisp'].enable();
    this.form.controls['hinhanh'].enable();
    
    this.form.controls['mota'].enable();

  }
  getlistloaisp(){
    this.adminService.getlistloaisp().subscribe(data =>{
      if (!data) {
        console.log('err');
      }
      else {
        this.list = data;   
         
      }
    })
  }
  onThemspSubmit(){
    this.processing = true;
    this.disableForm();
    const sanpham = {
      idloaisanpham: this.form.get('loaisp').value,
      tensanpham: this.form.get('name').value,
      thongtinsanpham: this.form.get('mota').value,
      gia: this.form.get('gia').value,
      donvi: this.form.get('donvitinh').value,
      hinhanh: this.form.get('hinhanh').value
    }
    this.adminService.themsp(sanpham).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = "Không thêm được sản phẩm !"; // Return error message
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = "Đã Thêm Sản Phẩm !";
        console.log(data["message"]);
      }
    })
  }
  checktensp() {
    this.adminService.checksp(this.form.get('name').value).subscribe(data =>{
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
