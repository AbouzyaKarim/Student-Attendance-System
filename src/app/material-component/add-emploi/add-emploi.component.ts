import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClasseService} from "../../services/classe.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {delay} from "rxjs/operators";
import {GlobalConstants} from "../../shared/global-constants";
import {EmploiService} from "../../services/emploi.service";

@Component({
  selector: 'app-add-emploi',
  templateUrl: './add-emploi.component.html',
  styleUrls: ['./add-emploi.component.scss']
})
export class AddEmploiComponent implements OnInit {

  emploiForm :any = FormGroup;
  responseMessage: any;
  classes: any;

  constructor(private formBuilder: FormBuilder,
              private classeService: ClasseService,
              private  emploiService : EmploiService,
              private snackbarService: SnackbarService,
              private router : Router) { }

  ngOnInit(): void {

    this.emploiForm = this.formBuilder.group({
      cours: [null, [Validators.required]],
      jour: [null, [Validators.required]],
      heureDB : [null, [Validators.required]],
      heureDF : [null, [Validators.required]],
      classeId : [null, [Validators.required]],
    });

    this.getClasses();
  }

  handelSubmit() {
    var formData = this.emploiForm.value;
    var data = {
      cours: formData.cours,
      jour: formData.jour,
      heureDB : formData.heureDB,
      heureDF : formData.heureDF,
      classeId : formData.classeId,
    }

    this.emploiService.add(data).subscribe(async (response: any) => {


      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      await delay(5000);
      this.router.navigate(['/attendance/emploi']);

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

  onClick() {
    this.router.navigate(['/attendance/emploi']);
  }
}
