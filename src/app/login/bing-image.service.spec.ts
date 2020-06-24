import { TestBed } from '@angular/core/testing';

import { BingImageService } from './bing-image.service';

describe('BingImageService', () => {
  let service: BingImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
