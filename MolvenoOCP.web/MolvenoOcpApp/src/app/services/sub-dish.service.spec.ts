import { TestBed, inject } from '@angular/core/testing';

import { SubDishService } from './sub-dish.service';

describe('SubDishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubDishService]
    });
  });

  it('should be created', inject([SubDishService], (service: SubDishService) => {
    expect(service).toBeTruthy();
  }));
});
