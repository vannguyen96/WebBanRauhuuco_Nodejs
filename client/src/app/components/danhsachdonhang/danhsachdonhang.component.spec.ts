import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdonhangComponent } from './danhsachdonhang.component';

describe('DanhsachdonhangComponent', () => {
  let component: DanhsachdonhangComponent;
  let fixture: ComponentFixture<DanhsachdonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachdonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachdonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
