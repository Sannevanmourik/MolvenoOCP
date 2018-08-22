import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { IngredientService } from '../../services/ingredient-service.service';
import { Ingredient } from '../../models/ingredient';
import { Validators, FormBuilder} from '@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { element } from '../../../../node_modules/@angular/core/src/render3/instructions';
import { MatTable } from '@angular/material';

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

  editForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    vegetarian: [false],
    stock: [0],
    allergy: [null],
  });

  @ViewChild(MatTable) table: MatTable<any>;

  closeResult: string;

  editIngredient: Ingredient;

  formValue: Ingredient;


  // from angular material
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'vegetarian', 'edit'];

  subscription:  Subscription;

  @Input() ingredients: Array<Ingredient>;

  constructor( private fb: FormBuilder, private modalService: NgbModal, private ingredientService: IngredientService) { }

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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  get getIngredient() {
    return this.ingredients;
  }

  delete(ingredient: Ingredient): void {
    this.ingredients = this.ingredients.filter(h => h !== ingredient);
    this.ingredientService.deleteIngredient(ingredient.id).subscribe();
    this.ingredientService.getAll();
  }

  // put(ingredient: Ingredient): void {
  //   this.ingredients = this.ingredients.filter(h => h !== ingredient);
  //   this.ingredientService.updateIngredient(ingredient, ingredient.id).subscribe();
  //   this.ingredientService.getAll();

  // }


  edit(editIngredient) {
    this.formValue = this.editForm.value;
    this.formValue.name = editIngredient.name;
    this.formValue.price = editIngredient.price;
    this.formValue.vegetarian = editIngredient.vegetarian;
    this.formValue.stock = editIngredient.stock;
    this.formValue.allergy = editIngredient.allergy;
    this.formValue.id = editIngredient.id;
    console.log('edit');
    console.log(editIngredient);
    console.log('formValue');
    console.log(this.formValue);
    this.ingredientService.getAll();
    // this.update();
  }

  save() {

    const formValue = this.editForm.value;

    const newIngredient = new Ingredient();
    newIngredient.id = this.formValue.id;
    newIngredient.name = formValue.name;
    newIngredient.price = formValue.price;
    newIngredient.vegetarian = formValue.vegetarian;
    newIngredient.stock = formValue.stock;
    newIngredient.allergy = formValue.allergy;
    console.log('save');
    console.log(newIngredient);

    this.ingredientService.updateIngredient(newIngredient, newIngredient.id).subscribe();
    this.table.renderRows();


  }

  update() {
    if (this.editIngredient) {
      this.ingredientService.updateIngredient(this.editIngredient, this.editIngredient.id)
        .subscribe(movie => {
          const ix = movie ? this.ingredients.findIndex(h => h.id === movie.id) : -1;
          if (ix > -1) { this.ingredients[ix] = movie; }
        });
      this.editIngredient = undefined;
    }
    this.ingredientService.getAll();
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
