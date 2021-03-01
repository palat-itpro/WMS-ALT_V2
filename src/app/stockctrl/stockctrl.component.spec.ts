import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockctrlComponent } from './stockctrl.component';

describe('StockctrlComponent', () => {
  let component: StockctrlComponent;
  let fixture: ComponentFixture<StockctrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockctrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockctrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
