import { TestBed, inject } from '@angular/core/testing';

import { SignUpService } from './sign-up.service';

describe('SignUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpService]
    });
  });

  it('should ...', inject([SignUpService], (service: SignUpService) => {
    expect(service).toBeTruthy();
  }));
});
