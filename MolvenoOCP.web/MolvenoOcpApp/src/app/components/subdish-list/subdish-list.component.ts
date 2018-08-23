import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Validators, FormBuilder} from '@angular/forms';
import { SubDishService } from '../../services/sub-dish.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subdish } from '../../models/subdish';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-subdish-list',
  templateUrl: './subdish-list.component.html',
  styleUrls: ['./subdish-list.component.css']
})
export class SubdishListComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private modalService: NgbModal, private subdishService: SubDishService) { }

  editForm = this.fb.group({
    name: ['', Validators.required],
    ingredients: [[]]
  });

  closeResult: string;

  editSubdish: Subdish;

  displayedColumns: string[] = ['name', 'ingredients'];

  subscription:  Subscription;

  @Input() subdishes: Array<Subdish>;


  ngOnInit() {

    this.subscription = this.subdishService.getAll().subscribe(
      (data: Array<Subdish>) => {
        this.subdishes = data;

        console.log(this.subdishes);
      },
      (error) => {
        console.error('Failed to get i tutti subdishishi', error);
      }
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

  get getSubdish() {
    return this.subdishes;
  }

  delete(subdish: Subdish): void {
    this.subdishes = this.subdishes.filter(h => h !== subdish);
    this.subdishService.deleteSubdish(subdish.id).subscribe();
    this.subdishService.getAll();
  }

  edit(editSubdish) {
    this.editForm.value.name = editSubdish.name;
    this.editForm.value.price = editSubdish.price;
    this.editForm.value.vegetarian = editSubdish.vegetarian;
    this.editForm.value.stock = editSubdish.stock;
    this.editForm.value.allergy = editSubdish.allergy;
    this.editForm.value.id = editSubdish.id;
    console.log('edit');
    console.log(editSubdish);
    console.log('formValue');
    console.log(this.editForm.value);
    this.subdishService.getAll();
  }

  save(newSubdish: Subdish) {

    console.log('save');
    console.log(newSubdish);

    this.subdishService.updateSubdish(newSubdish, newSubdish.id).subscribe();
    this.subdishService.getAll();


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}