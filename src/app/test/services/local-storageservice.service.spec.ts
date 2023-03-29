import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from '../../services/local-storage.service';

describe('LocalStorageserviceService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
