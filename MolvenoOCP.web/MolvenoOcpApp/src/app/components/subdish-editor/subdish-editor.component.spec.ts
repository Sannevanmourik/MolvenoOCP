import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdishEditorComponent } from './subdish-editor.component';

describe('SubdishEditorComponent', () => {
  let component: SubdishEditorComponent;
  let fixture: ComponentFixture<SubdishEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdishEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdishEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
