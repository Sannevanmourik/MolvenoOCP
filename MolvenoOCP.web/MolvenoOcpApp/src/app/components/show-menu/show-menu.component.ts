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

  public menus: Menu[];

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

}
