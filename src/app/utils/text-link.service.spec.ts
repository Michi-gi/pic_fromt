import { TestBed } from '@angular/core/testing';

import { TextLinkService } from './text-link.service';

describe('TextLinkService', () => {
  let service: TextLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
