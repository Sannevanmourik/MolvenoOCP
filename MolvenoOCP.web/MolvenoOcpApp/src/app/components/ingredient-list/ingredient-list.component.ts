import { Component, OnInit, Input } from '@angular/core';
import { IngredientService } from '../../services/ingredient-service.service';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  @Input() ingredients: Array<Ingredient>;

  constructor( private ingredientService: IngredientService) { }

  ngOnInit() {

  }

  get getIngredient() {
    return this.ingredients;
  }


}
