import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../../services/menu.service';
import { IngredientService } from '../../../../services/ingredient-service.service';
import { Menu } from '../../../../models/menu';
import { Ingredient } from '../../../../models/ingredient';
import { MenuItemsInterface } from '../../menu-cat';
import { Seasons } from '../../../../models/seasons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MenuService, IngredientService],
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public parentData: MenuItemsInterface;
  public parentForm: FormGroup; // FORM MODEL!!

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.parentData = this.getParentData();
    this.parentForm = this.toFormGroup(this.parentData);
  }

private getParentData(): MenuItemsInterface {
  this.menuService.addMenu(this.parentData).subscribe();
return null;
}

// private getParentData(): MenuItemsInterface {
//   this.menuService.updateMenu(this.parentData, this.parentData.id).subscribe();
// return null;
// }


private toFormGroup(data: MenuItemsInterface): FormGroup {
  const formGroup = this.fb.group({
    id: [data.id],
    name: [data.name, [Validators.required, Validators.minLength(5)]],
    profit: [''],
    salesPrice: [data.salesPrice, [Validators.required]],
    calculatedPrice: [''],
    vegetarian: [data.vegetarian],
    ingredientsInStock: [data.ingredientsInStock],
    amountOfTimesOrdered: [''],
    menuCategory: [''],
    ingredientList: this.fb.array([this.initIngredientList()]),
    subDishList: this.fb.array([this.initsubdishList()]),
    filteredListOfAllergiesPerMenuItem: [this.initAllergiesList()],
  });
    return formGroup;
}


  initIngredientList() {
    return this.fb.group({
      allergy: [''],
      id: [''],
      inStock: [''],
      name: [''],
      price: [''],
      stock: [''],
      vegetarian: [''],
    });
  }
  initsubdishList() {
    return this.fb.group({
      id: [''],
      ingredientList: this.fb.array([this.initSubIngredientList()]),
      name: [''],
      vegetarian: [''],
    });
  }
    initSubIngredientList() {
      return this.fb.group({
        allergy: [''],
        id: [''],
        inStock: [''],
        name: [''],
        price: [''],
        stock: [''],
        vegetarian: [''],
      });
    }
  initAllergiesList() {
    return this.fb.group({ // fix enum input here somehow
      id: [''],
    });
  }




  // addingredientList() {
  //   // add address to the list
  //   const control = <FormArray>this.myForm.controls['ingredientList'];
  //   control.push(this.initIngredientList());
  // }

  // addsubDishList() {
  //   const control = <FormArray>this.myForm.controls['subDishList'];
  //   control.push(this.initsubdishList());
  // }
  // addsubDishIngredientList() {
  //   const control = <FormArray>this.myForm.controls['subDishIngredientList'];
  //   control.push(this.initSubIngredientList());
  // }

  // addAllergiesList() {
  //   const control = <FormArray>this.myForm.controls['filteredListOfAllergiesPerMenuItem'];
  //   control.push(this.initAllergiesList());
  // }

  // removeingredientList(i: number) {
  //   const control = <FormArray>this.myForm.controls['ingredientList'];
  //   control.removeAt(i);
  // }

  // removeSubDishList(i: number) {
  //   const control = <FormArray>this.myForm.controls['subDishList'];
  //   control.removeAt(i);
  // }

  // removeAllergiesList(i: number) {
  //   const control = <FormArray>this.myForm.controls['filteredListOfAllergiesPerMenuItem'];
  //   control.removeAt(i);
  // }

  // update(menuItemsInterface: MenuItemsInterface) {      // INTERFACE
  //   console.log(menuItemsInterface);
  //   //   this.menuService.updateMenu(this.form.value.categoryname).subscribe(data=>{
  //   //     console.log(data);
  //   //  })
  //   this.menuService.updateMenu(menuItemsInterface, menuItemsInterface.id).subscribe();
  // }
}
