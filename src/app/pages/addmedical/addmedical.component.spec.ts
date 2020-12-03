import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicalComponent } from './addmedical.component';

describe('AddmedicalComponent', () => {
  let component: AddmedicalComponent;
  let fixture: ComponentFixture<AddmedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
