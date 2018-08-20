import { TestBed, inject } from '@angular/core/testing';

import { IngredientServiceService } from './ingredient-service.service';

describe('IngredientServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientServiceService]
    });
  });

  it('should be created', inject([IngredientServiceService], (service: IngredientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
