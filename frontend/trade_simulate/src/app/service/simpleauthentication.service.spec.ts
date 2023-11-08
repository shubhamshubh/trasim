import { TestBed } from '@angular/core/testing';

import { SimpleauthenticationService } from './simpleauthentication.service';

describe('SimpleauthenticationService', () => {
  let service: SimpleauthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleauthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
