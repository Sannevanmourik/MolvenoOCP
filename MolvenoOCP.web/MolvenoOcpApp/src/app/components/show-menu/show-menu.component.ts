import { MenuItem } from './../../models/menuItem';

import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../models/Menu';
import { MenuServiceService } from '../../services/menu-service.service';
import { Subscription } from '../../../../node_modules/rxjs';


@Component({
  selector: 'app-show-menu',
  templateUrl: './show-menu.component.html',
  styleUrls: ['./show-menu.component.css']
})
export class ShowMenuComponent implements OnInit {

  subscription: Subscription;

public vegetarian: boolean;

  public menus: Menu[];
  public menuItems: MenuItem[];
  public menu: Menu;

  constructor( private menuService: MenuServiceService) { 

  }

  ngOnInit() {
    this.subscription = this.menuService.getAll().subscribe(menus => {
      this.menus = menus;
      console.log(this.menus);
    },
    (error) => {
      console.error('Failed to get menu', error);
    }
  );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // getMenu(id: number): Menu{
  //   return this.menu;
  // }

  getMenus(): Menu[] {
    return this.menus;
  }

  setMenu(vegetarian: boolean){
    console.log('setting menu to: '+ vegetarian);

    if(vegetarian){
    return this.menus = [];

    // if(vegetarian) {
    //   let allMenuItems = this.getMenus();
    //   allMenuItems.forEach(menuItem => {
    //     if(menuItem.vegetarian){
    //       this.menuItems.push(menuItem);
             
    //       }
    //       return this.menuItems;
    //     });
      
   
    } else {

      this.getMenus();
      // this.getMenu(0);
    }
  }

  // getVegetarianMenu(){
  //   this.subscription = this.menuService.getVegetarianMenu().subscribe(menuItems => {
  //     this.menuItems = menuItems;
  //     return menuItems;
  //   },
  //   (error) => {
  //     console.error('Failes to get menu', error);
  //   }
  // );
  //   }
  // }

  

}
