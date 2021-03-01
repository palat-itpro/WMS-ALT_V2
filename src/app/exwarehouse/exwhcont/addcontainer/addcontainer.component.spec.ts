import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontainerComponent } from './addcontainer.component';

describe('AddcontainerComponent', () => {
  let component: AddcontainerComponent;
  let fixture: ComponentFixture<AddcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
