import { TestBed, inject } from '@angular/core/testing';

import { IngredientService } from './ingredient-service.service';

describe('IngredientServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientService]
    });
  });

  it('should be created', inject([IngredientService], (service: IngredientService) => {
    expect(service).toBeTruthy();
  }));
});
