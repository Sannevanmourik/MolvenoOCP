import {Component} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent {
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    ) {}

    openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'modal-backdrop'}).result.then((result) => {
    // this.modalService.open(content, { size: 'lg' }).dismiss();
        // this.closeResult = `Closed with: ${result}`;
     console.log('closing modal') ;
this.activeModal.close();
this.activeModal.dismiss();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('dismissed');
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
}

