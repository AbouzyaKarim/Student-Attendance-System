import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {GlobalConstants} from "../../shared/global-constants";
import {ClasseService} from "../../services/classe.service";

@Component({
  selector: 'app-manage-classe',
  templateUrl: './manage-classe.component.html',
  styleUrls: ['./manage-classe.component.scss']
})
export class ManageClasseComponent implements OnInit {

  displayColumns:string[] = ['name','description','nombreEtudiant','edit'];
  dataSource:any;
  responseMessage : any;
  constructor(private classeService:ClasseService,
              private snackBarService:SnackbarService,private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.classeService.getClasses().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  handleEditAction(data:any) {
    this.router.navigate(["/attendance/editClasse",data.id]);
  }

  handleNewClasse() {
    this.router.navigateByUrl("/attendance/addClasse");
  }
}
