import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmploiComponent } from './manage-emploi.component';

describe('ManageEmploiComponent', () => {
  let component: ManageEmploiComponent;
  let fixture: ComponentFixture<ManageEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmploiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
