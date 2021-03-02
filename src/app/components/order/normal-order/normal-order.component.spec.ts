import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalOrderComponent } from './normal-order.component';

describe('NormalOrderComponent', () => {
  let component: NormalOrderComponent;
  let fixture: ComponentFixture<NormalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
