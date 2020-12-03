import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertlistingComponent } from './certlisting.component';

describe('CertlistingComponent', () => {
  let component: CertlistingComponent;
  let fixture: ComponentFixture<CertlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
