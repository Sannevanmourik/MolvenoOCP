import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IngredientService } from '../../services/ingredient-service.service';
import { Ingredient } from '../../models/ingredient';
import { Subscription } from '../../../../node_modules/rxjs';

// from agnular material
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {


  // from angular material
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'vegetarian', 'edit'];

  subscription:  Subscription;

  @Input() ingredients: Array<Ingredient>;

  constructor( private ingredientService: IngredientService) { }

  ngOnInit() {
    this.subscription = this.ingredientService.getAll().subscribe(
      (data: Array<Ingredient>) => {
        this.ingredients = data;

        console.log(this.ingredients);
      },
      (error) => {
        console.error('Failed to get i tutti ingredienti', error);
      }
    );
  }

  get getIngredient() {
    return this.ingredients;
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
