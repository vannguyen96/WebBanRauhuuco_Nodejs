import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemloaisanphamComponent } from './themloaisanpham.component';

describe('ThemloaisanphamComponent', () => {
  let component: ThemloaisanphamComponent;
  let fixture: ComponentFixture<ThemloaisanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemloaisanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemloaisanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
