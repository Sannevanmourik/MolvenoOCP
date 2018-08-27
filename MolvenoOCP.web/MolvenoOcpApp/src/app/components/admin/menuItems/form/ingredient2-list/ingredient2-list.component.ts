import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { IngredientsInterface } from '../../../menu-cat';

@Component({
  selector: 'app-ingredient2-list',
  templateUrl: './ingredient2-list.component.html',
  styleUrls: ['./ingredient2-list.component.css']
})
export class IngredientList2Component implements OnInit {
  @Input('parentForm')
  public parentForm: FormGroup;

  @Input('ingredientList')
  public ingredientList: IngredientsInterface[];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
      this.parentForm.addControl('ingredientList', new FormArray([]));
  }

}
