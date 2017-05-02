import { TestBed, inject } from '@angular/core/testing';

import { SingInService } from './sing-in.service';

describe('SingInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingInService]
    });
  });

  it('should ...', inject([SingInService], (service: SingInService) => {
    expect(service).toBeTruthy();
  }));
});
