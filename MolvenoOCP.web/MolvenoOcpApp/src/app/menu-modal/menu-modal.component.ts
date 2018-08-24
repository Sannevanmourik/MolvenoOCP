import { IngredientService } from './../services/ingredient-service.service';
import { Ingredient } from './../models/ingredient';
import { Component, EventEmitter, Output } from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent {

  @Output() 
  vegetarian = new EventEmitter<boolean>();

  private vegetarianSelected: boolean = false;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    ) {}

    openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'modal-backdrop'}).result.then(
      (result) => {
        console.log('closing modal') ;
        console.log('emitting'+this.vegetarianSelected);
        this.vegetarian.emit(this.vegetarianSelected);
        this.activeModal.close();
        this.activeModal.dismiss();
      }, 
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log('dismissed');
      }
    );
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

    public testClick() {
      console.log("test geclicked");
    }

}

