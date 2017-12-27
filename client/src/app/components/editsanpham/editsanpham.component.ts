import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editsanpham',
  templateUrl: './editsanpham.component.html',
  styleUrls: ['./editsanpham.component.css']
})
export class EditsanphamComponent implements OnInit {
  id_loaisp;
  messageClass;
  message;
  name;
  hinhanh;
  gia;
  donvitinh;
  idloaisanpham;
  thongtinsp;
  list = [];
  listloaisp = [];
  testlist =[];
  tenloaisanpham;
  form: FormGroup;
  processing = false;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private activeRroute: ActivatedRoute
  ) {
    this.createNewAddSanPhamForm();
    this.getthongtinsp();
    this.getloaisp();
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
        Validators.maxLength(500)
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
  getloaisp(){
    this.activeRroute.params.subscribe((params: any) =>{
      this.adminService.getsuasp(params.id).subscribe(data =>{
        if (!data) {
          console.log('err');
        }
        else {
          this.list = data;  
          this.idloaisanpham = this.list[0].idloaisanpham;
          this.adminService.getsualoaisp(this.idloaisanpham).subscribe(data =>{
            if (!data) {
              console.log('err');
            }
            else {
              this.testlist = data;
              this.tenloaisanpham= this.testlist[0].tenloaisanpham;
              console.log(this.tenloaisanpham);
            }
          })
        }
      })
    })
    this.adminService.getlistloaisp().subscribe(data =>{
      if (!data) {
        console.log('err');
      }
      else {
        this.listloaisp = data;            
      }
    })

  }
  getthongtinsp(){
    this.activeRroute.params.subscribe((params: any) =>{
      this.adminService.getsuasp(params.id).subscribe(data =>{
        
        if (!data) {
          console.log('err');
        }
        else {
          this.list = data;  
          this.name = this.list[0].tensanpham;
          this.hinhanh = this.list[0].hinhanh;  
          this.gia = this.list[0].gia;
          this.donvitinh = this.list[0].donvi;
          this.idloaisanpham = this.list[0].idloaisanpham;
          this.thongtinsp = this.list[0].thongtinsanpham;
          
        }
      })
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
  onThemspSubmit(){
    
    
    
    this.activeRroute.params.subscribe((params :any) =>{
      const sanpham = {
        idloaisp: this.form.get('loaisp').value,
        tensanpham: this.form.get('name').value,
        thongtinsanpham: this.form.get('mota').value,
        gia: this.form.get('gia').value,
        donvi: this.form.get('donvitinh').value,
        hinhanh: this.form.get('hinhanh').value,
        id: params.id
        
      }
      this.adminService.suasp(sanpham).subscribe(data =>{
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Return error class
          this.message = data.message; // Return error message
          
        } else {
          this.messageClass = 'alert alert-success'; // Return success class
          this.message = data.message; // Return success message
          
        }
      })
    })
  }
  ngOnInit() {
  }

}
