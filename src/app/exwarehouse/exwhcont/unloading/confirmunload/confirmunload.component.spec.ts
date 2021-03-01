import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmunloadComponent } from './confirmunload.component';

describe('ConfirmunloadComponent', () => {
  let component: ConfirmunloadComponent;
  let fixture: ComponentFixture<ConfirmunloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmunloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmunloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
