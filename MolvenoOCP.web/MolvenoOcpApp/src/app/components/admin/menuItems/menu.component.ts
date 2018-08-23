import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from '../../../../../node_modules/rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../models/menu';
import { Ingredient } from '../../../models/ingredient';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [MenuService],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  editForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    profit: [0, Validators.required],
    salesPrice: [0, Validators.required],
    calculatedPrice: [0, Validators.required],
    edit: [null],
  });

  closeResult: string;
  editMenu: Menu;
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

  @Input() menus: Array<Menu>;
  @Input() ingredients: Array<Ingredient>;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private menuService: MenuService) { }

  ngOnInit() {
    this.subscription = this.menuService.getAll().subscribe(
      (data: Array<Menu>) => {
        this.menus = data;

        console.log('Data: ');
        console.log(this.menus);

        // for (const entry of this.menus) {
        // entry.ingredientList.forEach(function (test) {
        //   console.log(test);
        // });
        // }
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

  get getMenus() {
    return this.menus;
  }

  delete(menus: Menu): void {
    this.menus = this.menus.filter(h => h !== menus);
    this.menuService.deleteMenu(menus.id).subscribe();
    console.log(menus.id + '. ' + menus.name + ': DELETED...');
    this.menuService.getAll();
  }

  edit(editMenu) {
    this.editForm.value.name = editMenu.name;
    this.editForm.value.price = editMenu.price;
    this.editForm.value.vegetarian = editMenu.vegetarian;
    this.editForm.value.stock = editMenu.stock;
    this.editForm.value.allergy = editMenu.allergy;
    this.editForm.value.id = editMenu.id;
    console.log('edit');
    console.log(editMenu);
    console.log('formValue');
    console.log(this.editForm.value);
    this.menuService.getAll();
  }

  save(newMenu: Menu) {
    console.log('saved: ');
    console.log(newMenu);
    this.menuService.updateMenu(newMenu, newMenu.id).subscribe();
    this.menuService.getAll();
  }

  add(newMenu: Menu) {
    this.menuService.addMenu(newMenu).subscribe();
    console.log('added: ');
    console.log(newMenu);
    this.menuService.getAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
