import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../../services/classe.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {AbsenceService} from "../../services/absence.service";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";

@Component({
  selector: 'app-manage-absence',
  templateUrl: './manage-absence.component.html',
  styleUrls: ['./manage-absence.component.scss']
})
export class ManageAbsenceComponent implements OnInit {

  displayColumns:string[] = ['name','email','contactNumber','cours','classe','edit'];
  dataSource:any;
  responseMessage : any;
  constructor(private absenceService:AbsenceService,
              private snackBarService:SnackbarService,private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.absenceService.getAllAbsences().subscribe((response:any)=>{
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

  handleNewAbsence() {
    this.router.navigate(["/attendance/addAbsence"]);
  }

  handleDeleteAction(data:any) {
    let conf = confirm("Are you sure?");
    if(conf==false) return

    this.absenceService.delete(data.id).subscribe((response:any)=>{
      this.tableData();
      this.responseMessage = response?.message;
      this.snackBarService.openSnackBar(this.responseMessage,"");
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

  handleSMS() {
    this.absenceService.sendSMS().subscribe((response:any)=>{

      this.responseMessage = response?.message;
      this.snackBarService.openSnackBar("sent successfully",GlobalConstants.error);
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar("success","");
    })
  }
}
