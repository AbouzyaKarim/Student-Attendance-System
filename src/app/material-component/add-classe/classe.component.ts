import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SnackbarService} from "../../services/snackbar.service";
import {ClasseService} from "../../services/classe.service";
import {Router} from "@angular/router";
import {GlobalConstants} from "../../shared/global-constants";
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  classeForm :any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
              private classeService: ClasseService,

              private snackbarService: SnackbarService,
              private router : Router) { }

  ngOnInit(): void {

    this.classeForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      nombreEtudiant : [null, [Validators.required]]
    });
  }


  handelSubmit() {
    var formData = this.classeForm.value;
    var data = {
      name: formData.name,
      description : formData.description,
      nombreEtudiant : formData.nombreEtudiant
    }

    this.classeService.add(data).subscribe(async (response: any) => {


      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      await delay(5000);
      this.router.navigate(['/attendance/classe']);

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
    this.router.navigate(['/attendance/classe']);
  }
}
