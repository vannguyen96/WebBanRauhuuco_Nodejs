import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
  domain = "http://localhost:8080";
  constructor(
    private http: Http
  ) { }
  getlistloaisp(){
    return this.http.get(this.domain +'/admin/cate-danh-sach').map(res=>res.json());
  }
  getlistuser(){
    return this.http.get(this.domain +'/admin/user-danh-sach').map(res=>res.json());
  }
  themloaisp(loaisanpham){
    return this.http.post(this.domain + '/admin/cate-them-cate/' , loaisanpham).map(res => res.json());
  }
  checktenloaisp(tenloaisanpham){
    return this.http.get(this.domain + '/admin/checkLoaisp/' + tenloaisanpham).map(res => res.json());
  }
  checksp(tensanpham){
    return this.http.get(this.domain + '/admin/checkSP/' + tensanpham).map(res => res.json());
  }
  xoaloaisp(id){
    return this.http.get(this.domain + '/admin/xoaloaisp/' +id).map(res => res.json());
  }
  xoasp(id){
    return this.http.get(this.domain + '/admin/xoasp/'+ id).map(res => res.json());
  }
  getlistsanpham(){
    return this.http.get(this.domain +'/admin/danhsach-sanpham/').map(res=>res.json());
  }
  themsp(sanpham){
    return this.http.post(this.domain + '/admin/themsanpham/' , sanpham).map(res => res.json());
  }
  getsualoaisp(id){
    return this.http.get(this.domain +'/admin/sualoaisp/' +id).map(res=>res.json());
  }
  getsuasp(id){
    return this.http.get(this.domain +'/admin/suasp/' +id).map(res=>res.json());
  }
  thanhtoanhoadon(id){
    return this.http.get(this.domain +'/admin/thanhtoanhoadon/' +id).map(res=>res.json());
  }
  sualoaisp(loaisanpham){
    return this.http.post(this.domain + '/admin/update-loaisp/' , loaisanpham).map(res => res.json());
  }
  suasp(sanpham){
    return this.http.post(this.domain + '/admin/update-sanpham/' , sanpham).map(res => res.json());
  }
  getdonhang(){
    return this.http.get(this.domain +'/admin/donhang/').map(res=>res.json());
  }
  getchitietdonhang(id){
    return this.http.get(this.domain +'/admin/chitietdonhang/' +id).map(res=>res.json());
  }
  getdonhangcanxem(id){
    return this.http.get(this.domain +'/admin/donhangcanxem/' +id).map(res=>res.json());
  }
}
