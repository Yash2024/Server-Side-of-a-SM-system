import { TestBed } from '@angular/core/testing';

import { ProdlistService } from './prodlist.service';

describe('ProdlistService', () => {
  let service: ProdlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
