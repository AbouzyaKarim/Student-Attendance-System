import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  url = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  getAllEmplois(){
    return this.httpClient.get(this.url + '/emploi/get');
  }

  add(data:any){
    return this.httpClient.post(this.url + '/emploi/add', data,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }

  delete(id:any){
    return this.httpClient.post(this.url + '/emploi/delete/'+id,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}
