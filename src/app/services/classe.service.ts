import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  url = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+"/classes/add",data, {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url+"/classes/update",data, {
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getClasses(){
    return this.httpClient.get(this.url+"/classes/get");
  }



  getClasseById(id: any) {
    return this.httpClient.get(this.url+"/classes/getClasseById/"+id);
  }
}
