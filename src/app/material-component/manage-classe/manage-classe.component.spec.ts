import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClasseComponent } from './manage-classe.component';

describe('ManageClasseComponent', () => {
  let component: ManageClasseComponent;
  let fixture: ComponentFixture<ManageClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
