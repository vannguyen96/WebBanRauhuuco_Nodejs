import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditloaisanphamComponent } from './editloaisanpham.component';

describe('EditloaisanphamComponent', () => {
  let component: EditloaisanphamComponent;
  let fixture: ComponentFixture<EditloaisanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditloaisanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditloaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
