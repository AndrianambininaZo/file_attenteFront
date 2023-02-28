import { TestBed } from '@angular/core/testing';

import { AppelleService } from './appelle.service';

describe('AppelleService', () => {
  let service: AppelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
