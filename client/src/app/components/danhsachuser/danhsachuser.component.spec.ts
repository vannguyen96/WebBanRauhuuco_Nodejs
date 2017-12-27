import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachuserComponent } from './danhsachuser.component';

describe('DanhsachuserComponent', () => {
  let component: DanhsachuserComponent;
  let fixture: ComponentFixture<DanhsachuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
