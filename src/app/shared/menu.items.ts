import {Injectable} from '@angular/core';

export interface Menu{
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', role: ''},
  {state: 'classe', name: 'Manage Classe', type: 'link', icon: 'class', role: 'admin'},
  {state: 'etudiant', name: 'Manage Etudiant', type: 'link', icon: 'group', role: 'admin'},
  {state: 'emploi', name: 'Manage Emploi', type: 'link', icon: 'calendar_month', role: 'admin'},
  {state: 'absence', name: 'Manage Absence', type: 'link', icon: 'view_kanban', role: 'admin'},


];

@Injectable()
export class MenuItems{
  getMenuItem(): Menu[]{
    return MENUITEMS;
  }
}

