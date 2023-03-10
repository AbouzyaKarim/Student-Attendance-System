import { Component, AfterViewInit } from '@angular/core';
import {GlobalConstants} from "../shared/global-constants";
import {SnackbarService} from "../services/snackbar.service";
import {DashboardService} from "../services/dashboard.service";
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  responseMessage:any;
  data : any;

  ngAfterViewInit() { }

  constructor(private dashboardService : DashboardService,private snackBarService:SnackbarService) {
    this.dashboardData();
  }

  dashboardData(){
    this.dashboardService.getDetails().subscribe((response:any)=>{
      this.data=response;
    },(error:any) => {
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
