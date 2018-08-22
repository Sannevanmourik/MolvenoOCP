// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { AlertService,  } from '../../services/alert.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {

    @Output() loginSuccesful: EventEmitter<boolean> = new EventEmitter();

    editForm = this.fb.group({
        name: ['test', Validators.required],
        password: ['test', Validators.required],
      });

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    // @Input() ingredients: Array[] = ['test', 'test'];

    constructor(
        private fb: FormBuilder,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['test', Validators.required],
            password: ['test', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.returnUrl = 'admin';

      }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(' success');
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                    this.loginSuccesful.emit(true);
                },
                error => {
                  console.log(' invalid credentials');
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
