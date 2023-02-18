import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../services/snackbar.service";
import {GlobalConstants} from "../shared/global-constants";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm : any = FormGroup;
  responseMessage : any;


  constructor(private  fromBuilder : FormBuilder, private userService : UserService, public dialogRef : MatDialogRef<ForgotPasswordComponent>,
              private snackbarservice:SnackbarService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fromBuilder.group({
      email : [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit(){
    var formData = this.forgotPasswordForm.value;
    var data = {
      email : formData.email
    }
    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbarservice.openSnackBar(this.responseMessage,"");
    },(error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarservice.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
