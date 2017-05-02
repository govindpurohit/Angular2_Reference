import { TestBed, inject } from '@angular/core/testing';

import { AppCanActivateService } from './app-can-activate.service';

describe('AppCanActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCanActivateService]
    });
  });

  it('should ...', inject([AppCanActivateService], (service: AppCanActivateService) => {
    expect(service).toBeTruthy();
  }));
});
