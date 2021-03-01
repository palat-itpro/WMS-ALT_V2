import { TestBed } from '@angular/core/testing';

import { ExwhService } from './exwh.service';

describe('ExwhService', () => {
  let service: ExwhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExwhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
