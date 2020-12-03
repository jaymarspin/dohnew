import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcertComponent } from './addcert.component';

describe('AddcertComponent', () => {
  let component: AddcertComponent;
  let fixture: ComponentFixture<AddcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
