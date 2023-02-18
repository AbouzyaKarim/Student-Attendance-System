import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../services/snackbar.service";
import {GlobalConstants} from "../shared/global-constants";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password =true
  loginForm : any = FormGroup;
  responseMessage : any;


  constructor(private  fromBuilder : FormBuilder, private userService : UserService, public dialogRef : MatDialogRef<LoginComponent>,
              private router:Router,public snackbarservice : SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      email : [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]]
    });
  }

  handleSubmit(){
    var formData = this.loginForm.value;
    var data = {
      email : formData.email,
      password : formData.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.dialogRef.close();
      localStorage.setItem("token",response.token);
      this.router.navigate(["/attendance/dashboard"]);
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
