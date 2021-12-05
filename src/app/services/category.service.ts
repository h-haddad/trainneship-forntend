import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {Category} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  host: string = environment.host;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  getAllCategories():Observable<Category[]> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get<Category[]>(this.host + "/categories", {headers:header});
  }
}
