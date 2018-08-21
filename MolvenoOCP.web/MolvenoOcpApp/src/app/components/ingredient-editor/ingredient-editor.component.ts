import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { IngredientService } from '../../services/ingredient-service.service';
import {Ingredient} from '../../models/ingredient';

@Component({
  selector: 'app-ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
  styleUrls: ['./ingredient-editor.component.css']
})
export class IngredientEditorComponent {

  ingredients: Ingredient[];

  ingredientForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    vegetarian: [''],
    stock: [''],
    allergy: [''],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get aliases() {
    return this.ingredientForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder, private ingredientService: IngredientService) { }


  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.ingredientForm.value);
  }

  add(name: string, price: number, vegetarian: boolean, stock: number, allergy: string): void {
    // this.editMovie = undefined;
    // name = name.trim();
    // allergy = allergy.trim();
    if (!name) { return; }

    const newIngredient: Ingredient = { name, price, vegetarian, stock, allergy } as Ingredient;
    this.ingredientService.addIngredient(newIngredient)
      .subscribe(ingredient => {
        this.ingredients.push(ingredient);
        console.log('Ingredients now contains', this.ingredients);
        this.ingredientService.getAll();
      });
  }

}
