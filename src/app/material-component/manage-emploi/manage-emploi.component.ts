import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../services/snackbar.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {EmploiService} from "../../services/emploi.service";

@Component({
  selector: 'app-manage-emploi',
  templateUrl: './manage-emploi.component.html',
  styleUrls: ['./manage-emploi.component.scss']
})
export class ManageEmploiComponent implements OnInit {

  displayColumns:string[] = ['Cours','Jour','Date Debut','Date Fin','Classe','edit'];
  dataSource:any;
  responseMessage : any;

  constructor(private snackBarService : SnackbarService, private emploiService:EmploiService,private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  private tableData() {
    this.emploiService.getAllEmplois().subscribe((response:any)=>{
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

  handleNewEmploi() {
    this.router.navigateByUrl("/attendance/addEmploi");
  }

  handleDeleteEmploi(data:any) {
    let conf = confirm("Are you sure?");
    if(conf==false) return

    this.emploiService.delete(data.id).subscribe((response:any)=>{
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
  handleEditEmploi(data:any) {

  }
}
