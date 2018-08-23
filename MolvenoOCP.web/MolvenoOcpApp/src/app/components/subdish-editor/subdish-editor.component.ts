import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { SubDishService } from '../../services/sub-dish.service';
import { Subdish } from '../../models/subdish';
import { Subscription } from '../../../../node_modules/rxjs';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../services/ingredient-service.service';

@Component({
  selector: 'app-subdish-editor',
  templateUrl: './subdish-editor.component.html',
  styleUrls: ['./subdish-editor.component.css']
})
export class SubdishEditorComponent implements OnInit, OnDestroy {


  subdishes: Subdish[];

  ingredientSubscription: Subscription;

  availableIngredients: Array<Ingredient>;

  subdishForm = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([
      this.fb.control(0)
    ])
  });

  get ingredients() {
    return this.subdishForm.get('ingredients') as FormArray;
  }
  constructor(private fb: FormBuilder,
    private subdishService: SubDishService,
    private ingredientService: IngredientService
  ) { }



  addIngredient() {
    this.ingredients.push(this.fb.control(0));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.subdishForm.value);
  }

  add2() {
    const formValue = this.subdishForm.value;
    const newSubdish = new Subdish();
    newSubdish.name = formValue.name;
    newSubdish.ingredients = formValue.ingredients;

    console.log(newSubdish);

    this.subdishService.addSubdish(newSubdish).subscribe();
  }

  ngOnInit() {
    this.ingredientSubscription = this.ingredientService.getAll().subscribe(
      (data: Array<Ingredient>) => {
        this.availableIngredients = data;

        console.log(this.availableIngredients);
      },
      (error) => {
        console.error('Failed to get i tutti ingredienti', error);
      }
    );


  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

}
