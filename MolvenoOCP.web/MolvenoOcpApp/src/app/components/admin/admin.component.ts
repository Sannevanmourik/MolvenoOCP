// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { MenuService } from '../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [MenuService],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  name = 'admin';

  menus: Menu[];
  editMenu: Menu;

  constructor(private menuService: MenuService ) { }

  ngOnInit() {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getAll().subscribe(
      (menus: Array<Menu>) => {
        this.menus = menus;
        console.log('Retrieved menus:', this.menus);
      },
      (error) => {
        console.error('Failed to get menus', error);
      }
    );
  }

  add(
    id: number,
    name: string,
    salesPrice: number,
    menuCategory: string[],
    amountOfTimesOrdered: number,
    ingredientList: string[],
    subDishList: string[],
    profit: number,
    filteredListOfAllergiesPerMenuItem: string[],
    calculatedPrice: number,
    vegetarian,
    ingredientsInStock: number,
  ): void {
    this.editMenu = undefined;
    name = name.trim();
    if (!name) { return; }

    const newMenu: Menu = {
      id,
      name,
      salesPrice,
      menuCategory,
      amountOfTimesOrdered,
      ingredientList,
      subDishList,
      profit,
      filteredListOfAllergiesPerMenuItem,
      calculatedPrice,
      vegetarian,
      ingredientsInStock,
     } as Menu;
    this.menuService.addMenu(newMenu)
      .subscribe(menu => {
        this.menus.push(menu);
        console.log('Menu now contains', this.menus);
        this.menuService.getAll();
      });
  }

  delete(menu: Menu): void {
    this.menus = this.menus.filter(h => h !== menu);
    this.menuService.deleteMenu(menu.id).subscribe();
    this.menuService.getAll();
  }

  edit(menu) {
    this.editMenu = menu;
    this.menuService.getAll();
  }

  update() {
    if (this.editMenu) {
      this.menuService.updateMenu(this.editMenu, this.editMenu.id)
        .subscribe(menu => {
          const ix = menu ? this.menus.findIndex(h => h.id === menu.id) : -1;
          if (ix > -1) { this.menus[ix] = menu; }
        });
      this.editMenu = undefined;
    }
    this.menuService.getAll();
  }
}
