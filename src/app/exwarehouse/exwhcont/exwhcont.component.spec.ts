import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExwhcontComponent } from './exwhcont.component';

describe('ExwhcontComponent', () => {
  let component: ExwhcontComponent;
  let fixture: ComponentFixture<ExwhcontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExwhcontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExwhcontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
