import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdishesComponent } from './subdishes.component';

describe('SubdishesComponent', () => {
  let component: SubdishesComponent;
  let fixture: ComponentFixture<SubdishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
