import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';

import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangepasswordComponent } from './dialog/changepassword/changepassword.component';
import { ManageClasseComponent } from './manage-classe/manage-classe.component';
import { ClasseComponent } from './add-classe/classe.component';
import { EditClasseComponent } from './edit-classe/edit-classe.component';
import { ManageEtudiantComponent } from './manage-etudiant/manage-etudiant.component';
import { ManageEmploiComponent } from './manage-emploi/manage-emploi.component';
import { ManageAbsenceComponent } from './manage-absence/manage-absence.component';
import { EditEtudComponent } from './edit-etud/edit-etud.component';
import { AddEmploiComponent } from './add-emploi/add-emploi.component';
import { AddAbsenceComponent } from './add-absence/add-absence.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ConfirmationComponent,
    ChangepasswordComponent,
    ManageClasseComponent,
    ClasseComponent,
    EditClasseComponent,
    ManageEtudiantComponent,
    ManageEmploiComponent,
    ManageAbsenceComponent,
    EditEtudComponent,
    AddEmploiComponent,
    AddAbsenceComponent
  ]
})
export class MaterialComponentsModule {}
