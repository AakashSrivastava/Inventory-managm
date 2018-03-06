import { TestBed, inject } from '@angular/core/testing';

import { GetAllDataService } from './get-all-data.service';

describe('GetAllDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllDataService]
    });
  });

  it('should be created', inject([GetAllDataService], (service: GetAllDataService) => {
    expect(service).toBeTruthy();
  }));
});
