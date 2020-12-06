import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcertComponent } from './viewcert.component';

describe('ViewcertComponent', () => {
  let component: ViewcertComponent;
  let fixture: ComponentFixture<ViewcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
