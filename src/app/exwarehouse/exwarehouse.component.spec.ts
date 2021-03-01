import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExwarehouseComponent } from './exwarehouse.component';

describe('ExwarehouseComponent', () => {
  let component: ExwarehouseComponent;
  let fixture: ComponentFixture<ExwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExwarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
