import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientList2Component } from './ingredient2-list.component';

describe('IngredientListComponent', () => {
  let component: IngredientList2Component;
  let fixture: ComponentFixture<IngredientList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
