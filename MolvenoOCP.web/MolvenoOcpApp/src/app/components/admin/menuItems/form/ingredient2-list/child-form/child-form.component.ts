import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientsInterface } from '../../../../menu-cat';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements OnInit {

    @Input('ingredientList')
    public ingredientList: FormArray;

    @Input('ingredient')
    public ingredient: IngredientsInterface;

    public childForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.childForm = this.toFormGroup(this.ingredient);
        this.ingredientList.push(this.childForm);
    }

    private toFormGroup(data: IngredientsInterface) {
        const formGroup = this.fb.group({
            name: [ data.name || '', Validators.required ],
            price: [ data.price || '', Validators.required ],
            stock: [ data.stock ]
        });

        return formGroup;
    }
}
