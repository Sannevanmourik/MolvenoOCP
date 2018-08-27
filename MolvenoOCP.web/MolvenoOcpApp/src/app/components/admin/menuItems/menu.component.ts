import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from '../../../../../node_modules/rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../services/menu.service';
import { IngredientService } from '../../../services/ingredient-service.service';
import { Menu } from '../../../models/menu';
import { Ingredient } from '../../../models/ingredient';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu.component.html',
  providers: [MenuService, IngredientService],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  closeResult: string;
  displayedColumns: string[] = [
    'id',
    'name',
    'profit',
    'salesPrice',
    'calculatedPrice',
    'vegetarian',
    'ingredientsInStock',
    'amountOfTimesOrdered',
    'menuCategory',
    'ingredientList',
    'subDishList',
    'filteredListOfAllergiesPerMenuItem',
    'edit',
  ];

  subscription: Subscription;

  @Input() menuItems: Array<Menu>;
  @Input() ingredients: Array<Ingredient>;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private menuService: MenuService,
    private ingredientService: IngredientService) {}

  ngOnInit() {
    this.subscription = this.menuService.getAll().subscribe(
      (data: Array<Menu>) => {
        this.menuItems = data;

        console.log('MenuItems: ');
        console.log(this.menuItems);
      },
      (error) => {
        console.error('Failed to get i tutti ingredienti', error);
      }
    );

    this.subscription = this.ingredientService.getAll().subscribe(
      (data: Array<Ingredient>) => {
        this.ingredients = data;

        console.log('Ingredients: ');
        console.log(this.ingredients);
      },
      (error) => {
        console.error('Failed to get i tutti ingredienti', error);
      }
    );
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  delete(menus: Menu): void {
    this.menuItems = this.menuItems.filter(h => h !== menus);
    this.menuService.deleteMenu(menus.id).subscribe();
    console.log(menus.id + '. ' + menus.name + ': DELETED...');
    this.menuService.getAll();
    this.updateData();
  }

  save(newMenu: Menu) {
    console.log('saved: ');
    console.log(newMenu);
    this.menuService.updateMenu(newMenu, newMenu.id).subscribe();
    this.menuService.getAll();
    this.updateData();
  }

  add(newMenu: Menu) {
    this.menuService.addMenu(newMenu).subscribe();
    console.log('added: ');
    console.log(newMenu);
    this.menuService.getAll();
    this.updateData();
  }

  ngOnDestroy() {
    this.menuService.getAll();
    this.updateData();
  }

  updateData() {
      this.menuService.getAll().subscribe(
      (data: Array<Menu>) => {
        this.menuItems = data;

        console.log('MenuItems updated: ');
        console.log(this.menuItems);
      },
      (error) => {
        console.error('Failed to get i tutti ingredienti', error);
      }
    );

  }
}

  // edit(editMenu) {
  //   this.editForm.value.name = editMenu.name;
  //   this.editForm.value.price = editMenu.price;
  //   this.editForm.value.vegetarian = editMenu.vegetarian;
  //   this.editForm.value.stock = editMenu.stock;
  //   this.editForm.value.allergy = editMenu.allergy;
  //   this.editForm.value.id = editMenu.id;
  //   console.log('edit');
  //   console.log(editMenu);
  //   console.log('formValue');
  //   console.log(this.editForm.value);
  //   this.menuService.getAll();
  // }
  // get getMenus() {
  //   return this.menuItems;
  // }
