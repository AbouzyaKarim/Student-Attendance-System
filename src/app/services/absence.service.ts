import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  url = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  getAllAbsences(){
    return this.httpClient.get(this.url + '/absence/get');
  }

  add(data:any){
    return this.httpClient.post(this.url+"/absence/add",data, {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  delete(id:any){
    return this.httpClient.post(this.url + '/absence/delete/'+id,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  sendSMS() {
    return this.httpClient.post(this.url + '/absence/sendSms',
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}
