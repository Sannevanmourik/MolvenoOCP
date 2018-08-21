import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-ingredient-editor',
  templateUrl: './ingredient-editor.component.html',
  styleUrls: ['./ingredient-editor.component.css']
})
export class IngredientEditorComponent {

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

  constructor(private fb: FormBuilder) { }


  updateIngredient() {
    this.ingredientForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.ingredientForm.value);
  }

}
