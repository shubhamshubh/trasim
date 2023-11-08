import { TestBed } from '@angular/core/testing';

import { WatchlistdataService } from './watchlistdata.service';

describe('WatchlistdataService', () => {
  let service: WatchlistdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
