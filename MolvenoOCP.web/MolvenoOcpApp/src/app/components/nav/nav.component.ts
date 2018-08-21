import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AuthenticationService } from '../../services/authentication.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private authService: AuthenticationService) {
  }

  public getLoggedIn(): boolean {
    // console.log('toggeld isLoggedIn()...');
    return this.authService.isLoggedIn();
  }

  public login() {
    this.authService.loginUser('admin');
    // console.log('toggeld login()...');
  }

  public logout() {
    this.authService.logoutUser();
    // console.log('toggeld logout()...');
  }
}



