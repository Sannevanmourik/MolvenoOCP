import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Validators, FormBuilder, FormArray} from '@angular/forms';
import { SubDishService } from '../../../services/sub-dish.service';
import { IngredientService } from '../../../services/ingredient-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subdish } from '../../../models/subdish';
import { Ingredient } from '../../../models/ingredient';
import { Subscription } from 'node_modules/rxjs';

@Component({
  selector: 'app-subdishes',
  templateUrl: './subdishes.component.html',
  styleUrls: ['./subdishes.component.css']
})
export class SubdishesComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
     private subdishService: SubDishService,
      private ingredientService: IngredientService) { }

      editForm = this.fb.group({
        name: ['', Validators.required],
        ingredients: [[]]
      });

      subdishForm = this.fb.group({
        name: ['', Validators.required],
        ingredients: this.fb.array([
          this.fb.control(0)
        ])
      });



      closeResult: string;

      editSubdish: Subdish;

      displayedColumns: string[] = ['name', 'ingredients', 'edit'];

      subscription:  Subscription;

      @Input() subdishes: Array<Subdish>;
      // ingredients: Array<Ingredient>;

      ingredientSubscription: Subscription;

      availableIngredients: Array<Ingredient>;

      add2() {
        const formValue = this.subdishForm.value;
        const newSubdish = new Subdish();
        newSubdish.name = formValue.name;
        newSubdish.ingredients = formValue.ingredients;

        console.log(newSubdish);

        this.subdishService.addSubdish(newSubdish).subscribe();
        this.subdishService.getAll().subscribe(
          (data: Array<Subdish>) => {
            this.subdishes = data;

            console.log(this.subdishes);
          },
          (error) => {
            console.error('Failed to get i tutti subdishishi', error);
          }
        );
      }


      ngOnInit() {

        this.subscription = this.subdishService.getAll().subscribe(
          (data: Array<Subdish>) => {
            this.subdishes = data;

            console.log(this.subdishes);
          },
          (error) => {
            console.error('Failed to get i tutti subdishishi', error);
          }
        );

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

      get getSubdish() {
        return this.subdishes;
      }

      get ingredients() {
        return this.subdishForm.get('ingredients') as FormArray;
      }

      addIngredient() {
        this.ingredients.push(this.fb.control(0));
      }

      delete(subdish: Subdish): void {
        this.subdishes = this.subdishes.filter(h => h !== subdish);
        this.subdishService.deleteSubdish(subdish.id).subscribe();
        this.subdishService.getAll();
      }

      deleteIngredient(ingredient: Ingredient, subdish: Subdish): void {
        // this.ingredients = subdish.ingredients.filter(i => i !== ingredient);
        // this.availableIngredients = this.availableIngredients.filter(h => h !== ingredient);
        subdish.ingredients = subdish.ingredients.filter(i => i !== ingredient);
        this.subdishService.updateSubdish(subdish, subdish.id).subscribe();
        this.subdishService.getAll();
      }

      edit(editSubdish) {
        this.editForm.value.name = editSubdish.name;
        this.editForm.value.price = editSubdish.price;
        this.editForm.value.vegetarian = editSubdish.vegetarian;
        this.editForm.value.stock = editSubdish.stock;
        this.editForm.value.allergy = editSubdish.allergy;
        this.editForm.value.id = editSubdish.id;
        console.log('edit');
        console.log(editSubdish);
        console.log('formValue');
        console.log(this.editForm.value);
        this.subdishService.getAll();
      }
      save(newSubdish: Subdish) {
        console.log('save');
        console.log(newSubdish);
        this.subdishService.updateSubdish(newSubdish, newSubdish.id).subscribe();
        this.subdishService.getAll();
      }
      ngOnDestroy() {
        this.subscription.unsubscribe();
        this.ingredientSubscription.unsubscribe();
      }



}
