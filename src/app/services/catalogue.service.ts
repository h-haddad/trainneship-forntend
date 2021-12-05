import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  host: string = environment.host;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  getResource(url) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get(url, {headers:header});
  }

  deleteResource(url) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.delete(url, {headers:header});
  }

  postResource(url, data) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.post(url, data,{headers:header});
  }

  putResource(url, data) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.patch(url, data,{headers:header});
  }

  addUser(url, data) {
    return this.http.post(url, data);
  }
}
