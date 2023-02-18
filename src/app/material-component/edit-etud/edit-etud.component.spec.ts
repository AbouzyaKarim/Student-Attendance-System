import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtudComponent } from './edit-etud.component';

describe('EditEtudComponent', () => {
  let component: EditEtudComponent;
  let fixture: ComponentFixture<EditEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEtudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
