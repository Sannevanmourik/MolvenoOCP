import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { SubDishService } from '../../services/sub-dish.service';
import { Subdish } from '../../models/subdish';

@Component({
  selector: 'app-subdish-editor',
  templateUrl: './subdish-editor.component.html',
  styleUrls: ['./subdish-editor.component.css']
})
export class SubdishEditorComponent {


  subdishes: Subdish[];

  subdishForm = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([
      this.fb.control('')
    ])
  });

  // get aliases() {
  //   return this.ingredientForm.get('aliases') as FormArray;
  // }
  constructor(private fb: FormBuilder, private subdishService: SubDishService) { }



  // addAlias() {
  //   this.aliases.push(this.fb.control(''));
  // }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.subdishForm.value);
  }

  add2() {
    const formValue = this.subdishForm.value;
    const newSubdish = new Subdish();
    newSubdish.name = formValue.name;

    console.log(newSubdish);

    this.subdishService.addSubdish(newSubdish).subscribe();
  }

}
