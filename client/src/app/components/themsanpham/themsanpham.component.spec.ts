import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemsanphamComponent } from './themsanpham.component';

describe('ThemsanphamComponent', () => {
  let component: ThemsanphamComponent;
  let fixture: ComponentFixture<ThemsanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemsanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
