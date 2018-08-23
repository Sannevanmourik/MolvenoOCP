import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdishListComponent } from './subdish-list.component';

describe('SubdishListComponent', () => {
  let component: SubdishListComponent;
  let fixture: ComponentFixture<SubdishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
