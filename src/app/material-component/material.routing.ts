import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ManageClasseComponent} from "./manage-classe/manage-classe.component";
import {RouteGuardService} from "../services/route-guard.service";
import {ClasseComponent} from "./add-classe/classe.component";
import {EditClasseComponent} from "./edit-classe/edit-classe.component";
import {ManageEtudiantComponent} from "./manage-etudiant/manage-etudiant.component";
import {ManageEmploiComponent} from "./manage-emploi/manage-emploi.component";
import {ManageAbsenceComponent} from "./manage-absence/manage-absence.component";
import {AddEmploiComponent} from "./add-emploi/add-emploi.component";
import {AddAbsenceComponent} from "./add-absence/add-absence.component";


export const MaterialRoutes: Routes = [
  {
    path:'classe',
    component:ManageClasseComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },
  {
    path:'addClasse',
    component:ClasseComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  }
  ,
  {
    path:'editClasse/:id',
    component:EditClasseComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },

  {
    path:'etudiant',
    component:ManageEtudiantComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },

  {
    path:'emploi',
    component:ManageEmploiComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  },

  {
    path:'absence',
    component:ManageAbsenceComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  }
  ,
  {
    path:'addEmploi',
    component:AddEmploiComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  }
  ,
  {
    path:'addAbsence',
    component:AddAbsenceComponent,
    canActivate:[RouteGuardService],
    data:{
      expectedRole: ['admin']
    }
  }
];
