import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../shared/global-constants';
import {ClasseService} from "../services/classe.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  password = true;
  confirmPassword=true;
  signupForm:any = FormGroup;
  responseMessage:any;

  //private ngxService : NgxUiLoaderService
  classes: any;



  constructor(private formBuilder: FormBuilder,private router:Router,private userService : UserService,private classeService : ClasseService,
              private snackbarService: SnackbarService,private dialogRef:MatDialogRef<SignupComponent>,
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name : [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email : [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber : [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      classeId : [null,[Validators.required]],
      password : [null, [Validators.required]],
      confirmPassword : [null, [Validators.required]]
    })

    this.getClasses();
  }

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  getClasses(){
    this.classeService.getClasses().subscribe((response:any)=>{
      this.classes = response;
    },(error:any) => {
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }


  handleSubmit(){
    //this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name : formData.name,
      email: formData.email,
      contactNumber : formData.contactNumber,
      classeId : formData.classeId,
      password : formData.password
    }

    this.userService.signup(data).subscribe((response:any)=>{
      //this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },(error)=>{
      //this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

}
