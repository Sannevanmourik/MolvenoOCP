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

// from agnular material
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {


  // from angular material
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

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
