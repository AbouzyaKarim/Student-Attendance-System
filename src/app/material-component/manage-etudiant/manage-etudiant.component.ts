import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../../services/snackbar.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../shared/global-constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../../signup/signup.component";

@Component({
  selector: 'app-manage-etudiant',
  templateUrl: './manage-etudiant.component.html',
  styleUrls: ['./manage-etudiant.component.scss']
})
export class ManageEtudiantComponent implements OnInit {

  displayColumns:string[] = ['Name','Email','Contact Number','Classe','Activated','edit'];
  dataSource:any;
  responseMessage : any;

  constructor(private dialog : MatDialog,private snackBarService : SnackbarService, private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  private tableData() {
    this.userService.getAllUsers().subscribe((response:any)=>{
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


  handleNewEtudiant() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      this.dialog.open(SignupComponent,dialogConfig);

  }

  handleEditEtudiant(data:any) {

  }

  handleDeleteEtudiant(data:any) {
    let conf = confirm("Are you sure?");
    if(conf==false) return

    this.userService.deleteUser(data.id).subscribe((response:any)=>{
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

}
