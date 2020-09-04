import { TestBed } from '@angular/core/testing';

import { GetOtpService } from './get-otp.service';

describe('GetOtpService', () => {
  let service: GetOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
