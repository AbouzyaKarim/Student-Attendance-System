import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../../material-component/dialog/confirmation/confirmation.component";
import {ChangepasswordComponent} from "../../../material-component/dialog/changepassword/changepassword.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role : any;
  constructor(private router :Router, private dialog : MatDialog) {
  }


  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };
    const dialogRef : any = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub : any = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }
  changePassword(){
    const dialConfig = new MatDialogConfig();
    dialConfig.width = "550px";
    this.dialog.open(ChangepasswordComponent,dialConfig);
  }

}
