import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DanhsachloaisanphamComponent } from './components/danhsachloaisanpham/danhsachloaisanpham.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { ThemloaisanphamComponent } from './components/themloaisanpham/themloaisanpham.component';
import { DanhsachsanphamComponent } from './components/danhsachsanpham/danhsachsanpham.component';
import { EditloaisanphamComponent } from './components/editloaisanpham/editloaisanpham.component';
import { ThemsanphamComponent } from './components/themsanpham/themsanpham.component';
import { EditsanphamComponent } from './components/editsanpham/editsanpham.component';
import { DanhsachdonhangComponent } from './components/danhsachdonhang/danhsachdonhang.component';
import { ChitietdonhangComponent } from './components/chitietdonhang/chitietdonhang.component';
import { DanhsachuserComponent } from './components/danhsachuser/danhsachuser.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeadminComponent
      },
    {
        path: 'danh-sach',
        component : DanhsachloaisanphamComponent
        
    },
    {
        path: 'admin/cate/sua-cate/:id',
        component : EditloaisanphamComponent
        
    },
    {
        path: 'admin/danhsach-user',
        component : DanhsachuserComponent
        
    },
    {
        path: 'admin/chitietdonhang/:id',
        component : ChitietdonhangComponent
        
    },
    {
        path: 'admin/sanpham/sua-sanpham/:id',
        component : EditsanphamComponent
    },
    {
        path: 'admin/cart/danh-sach',
        component : DanhsachdonhangComponent
    },
    {
        path: 'danhsach-sanpham',
        component : DanhsachsanphamComponent
    },
    {
        path: 'admin-sanpham-them-sanpham',
        component : ThemsanphamComponent
        
    },
    {
        path: 'admin/cate/them-cate',
        component : ThemloaisanphamComponent       
    },
    { 
        path: '**',
        redirectTo: '/' 
    }
];
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }