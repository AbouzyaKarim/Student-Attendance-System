import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClasseService} from "../../services/classe.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {AbsenceService} from "../../services/absence.service";
import {delay} from "rxjs/operators";
import {GlobalConstants} from "../../shared/global-constants";
import {EmploiService} from "../../services/emploi.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.scss']
})
export class AddAbsenceComponent implements OnInit {

  absenceForm :any = FormGroup;
  responseMessage: any;
  users: any;
  emplois: any;

  constructor(private formBuilder: FormBuilder,
              private absenceService: AbsenceService,
              private emploiService : EmploiService,
              private userService : UserService,
              private snackbarService: SnackbarService,
              private router : Router) { }

  ngOnInit(): void {
    this.absenceForm = this.formBuilder.group({
      emploiId: [null, [Validators.required]],
      userId: [null, [Validators.required]]

    });
    this.getEmplois();
    this.getAllUsers();
  }
  handelSubmit() {
    var formData = this.absenceForm.value;
    var data = {
      emploiId: formData.emploiId,
      userId : formData.userId

    }

    this.absenceService.add(data).subscribe(async (response: any) => {


      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      await delay(5000);
      this.router.navigate(['/attendance/absence']);

    },(error)=>{

      console.error(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  }

  onClick() {
    this.router.navigate(['/attendance/absence']);
  }

  getEmplois(){
    this.emploiService.getAllEmplois().subscribe((response:any)=>{
      this.emplois = response;
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


  private getAllUsers() {
    this.userService.getAllUsers().subscribe((response:any)=>{
      this.users = response;
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
}
