import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExwhComponent } from './exwh.component';

describe('ExwhComponent', () => {
  let component: ExwhComponent;
  let fixture: ComponentFixture<ExwhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExwhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExwhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
