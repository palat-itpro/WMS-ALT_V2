import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptycontComponent } from './emptycont.component';

describe('EmptycontComponent', () => {
  let component: EmptycontComponent;
  let fixture: ComponentFixture<EmptycontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptycontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptycontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
