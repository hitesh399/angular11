import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumOrderComponent } from './premium-order.component';

describe('PremiumOrderComponent', () => {
  let component: PremiumOrderComponent;
  let fixture: ComponentFixture<PremiumOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
