
import { AuthenticationService } from '../../services/authentication.service';
import {NgbModule, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  selector: 'app-modal',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})


export class ModalComponent implements OnInit {

  closeResult: string;
  modalReference: any;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthenticationService) {}

    ngOnInit() {
      console.log('Login status: ' + this.getLoggedIn());
  }

  public getLoggedIn(): boolean {
    // console.log('toggeld isLoggedIn()...');
    return this.authService.isLoggedIn();
  }

  openLg(content) {

    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      console.log('dismissed');
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });

    if (this.getLoggedIn()) {
      console.log('closing modal...');
    } else {
      console.log('signing on');
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('dismissed by ESC');
      return '';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('dismissed by backdrop');
      return '';
    } else {
      return  `with: ${reason}`;
    }
  }

  closeModal() {
    this.modalReference.close();
  }
}
