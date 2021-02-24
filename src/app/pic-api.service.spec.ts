import { TestBed } from '@angular/core/testing';

import { PicApiService } from './pic-api.service';

describe('PicApiService', () => {
  let service: PicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
