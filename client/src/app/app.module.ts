import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DanhsachloaisanphamComponent } from './components/danhsachloaisanpham/danhsachloaisanpham.component';
import { ThemloaisanphamComponent } from './components/themloaisanpham/themloaisanpham.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { AdminService } from './services/admin.service';
import { DanhsachsanphamComponent } from './components/danhsachsanpham/danhsachsanpham.component';
import { EditloaisanphamComponent } from './components/editloaisanpham/editloaisanpham.component';
import { ThemsanphamComponent } from './components/themsanpham/themsanpham.component';
import { EditsanphamComponent } from './components/editsanpham/editsanpham.component';
import { DanhsachdonhangComponent } from './components/danhsachdonhang/danhsachdonhang.component';
import { ChitietdonhangComponent } from './components/chitietdonhang/chitietdonhang.component';
import { DanhsachuserComponent } from './components/danhsachuser/danhsachuser.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DanhsachloaisanphamComponent,
    ThemloaisanphamComponent,
    HomeadminComponent,
    DanhsachsanphamComponent,
    EditloaisanphamComponent,
    ThemsanphamComponent,
    EditsanphamComponent,
    DanhsachdonhangComponent,
    ChitietdonhangComponent,
    DanhsachuserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
