import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {GlobalConstants} from "../../../shared/global-constants";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  oldPassword = true;
  newPassword =true;
  confirmPassword =true;
  changePasswordForm:any = FormGroup;
  responseMessage : any;
  constructor(private formBuilder : FormBuilder,private userService : UserService,public dialogRef : MatDialogRef<ChangepasswordComponent>,
              private snackBarService : SnackbarService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword : [null,[Validators.required]],
      newPassword : [null,[Validators.required]],
      confirmPassword : [null,[Validators.required]],
    })
  }

  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;
    }else {
      return false;
    }
  }

  handlepasswordChangeSubmit(){
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword : formData.oldPassword,
      newPassword : formData.newPassword,
      confirmPassword : formData.confirmPassword
    }

    this.userService.changePassword(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackBarService.openSnackBar(this.responseMessage,"success");
    },(error)=>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
