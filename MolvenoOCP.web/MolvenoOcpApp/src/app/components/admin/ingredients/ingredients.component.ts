import { Validators, FormBuilder, FormArray } from '@angular/forms';
import {Ingredient} from '../../../models/ingredient';
import { Allergy } from '../../../models/allergy';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { IngredientService } from '../../../services/ingredient-service.service';
import { Subscription } from 'node_modules/rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { element } from '../../../../../node_modules/@angular/core/src/render3/instructions';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit, OnDestroy {

  editForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    vegetarian: [false],
    stock: [0],
    allergy: [null],
  });

  ingredientForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    vegetarian: [false],
    stock: [0],
    allergy: [null],
    // ingredients: this.fb.array([
    //   this.fb.control('')
    // ])
  });

  closeResult: string;

  editIngredient: Ingredient;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'vegetarian', 'edit'];

  subscription:  Subscription;

  @Input() ingredients: Array<Ingredient>;

  allergies: Allergy;

  constructor( private fb: FormBuilder,
     private modalService: NgbModal,
      private ingredientService: IngredientService) { }

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

  edit(editIngredient) {
    this.editForm.value.name = editIngredient.name;

    // this.formValue.name = editIngredient.name;
    this.editForm.value.price = editIngredient.price;
    this.editForm.value.vegetarian = editIngredient.vegetarian;
    this.editForm.value.stock = editIngredient.stock;
    this.editForm.value.allergy = editIngredient.allergy;
    this.editForm.value.id = editIngredient.id;
    console.log('edit');
    console.log(editIngredient);
    console.log('formValue');
    console.log(this.editForm.value);
    this.ingredientService.getAll();
    // this.update();
  }

  save(newIngredient: Ingredient) {

    console.log('save');
    console.log(newIngredient);

    this.ingredientService.updateIngredient(newIngredient, newIngredient.id).subscribe();
    this.ingredientService.getAll();


  }

  add2() {
    const formValue = this.ingredientForm.value;
    const newIngredient = new Ingredient();
    newIngredient.name = formValue.name;
    newIngredient.price = formValue.price;
    newIngredient.vegetarian = formValue.vegetarian;
    newIngredient.stock = formValue.stock;
    newIngredient.allergy = formValue.allergy;
    console.log(newIngredient);

    this.ingredientService.addIngredient(newIngredient).subscribe();
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
