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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private movieService: MenuService ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getAll().subscribe(
      (menus: Array<Menu>) => {
        this.menus = menus;
        console.log('Retrieved movies:', this.menus);
      },
      (error) => {
        console.error('Failed to get movies', error);
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

    const newMovie: Menu = {
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
    this.movieService.addMovie(newMovie)
      .subscribe(movie => {
        this.menus.push(movie);
        console.log('Films now contains', this.menus);
        this.movieService.getAll();
      });
  }

  delete(movie: Menu): void {
    this.menus = this.menus.filter(h => h !== movie);
    this.movieService.deleteMovie(movie.id).subscribe();
    this.movieService.getAll();
  }

  edit(movie) {
    this.editMenu = movie;
    this.movieService.getAll();
  }

  update() {
    if (this.editMenu) {
      this.movieService.updateMovie(this.editMenu, this.editMenu.id)
        .subscribe(movie => {
          const ix = movie ? this.menus.findIndex(h => h.id === movie.id) : -1;
          if (ix > -1) { this.menus[ix] = movie; }
        });
      this.editMenu = undefined;
    }
    this.movieService.getAll();
  }
}
