import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClasseService} from "../../services/classe.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalConstants} from "../../shared/global-constants";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.scss']
})
export class EditClasseComponent implements OnInit {

  classeForm :any = FormGroup;
  responseMessage: any;

  private classeId: any;
  private classe: any;


  constructor(private formBuilder: FormBuilder,
              private classeService: ClasseService,
              private route: ActivatedRoute,
              private snackbarService: SnackbarService,
              private router : Router)
  {
    this.classeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.classeService.getClasseById(this.classeId).subscribe({
      next : (data)=>{
        this.classe = data;

        this.classeForm = this.formBuilder.group({
          name: [this.classe.name, [Validators.required]],
          description: [this.classe.description, [Validators.required]],
          nombreEtudiant : [this.classe.nombreEtudiant, [Validators.required]]
        });

      },error : (err)=>{
        console.log(err);
      }
    })


  }



  onClick() {
    this.router.navigate(['/attendance/classe']);
  }


  handelSubmit() {
    var formData = this.classeForm.value;
    var data = {
      id:this.classeId,
      name: formData.name,
      description : formData.description,
      nombreEtudiant : formData.nombreEtudiant
    }

    this.classeService.update(data).subscribe( (response: any) => {

      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");

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
}
