import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloaddialogComponent } from './unloaddialog.component';

describe('UnloaddialogComponent', () => {
  let component: UnloaddialogComponent;
  let fixture: ComponentFixture<UnloaddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloaddialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloaddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
