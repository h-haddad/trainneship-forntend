import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host: string = environment.host;
  jwt: string | undefined;
  username: string | undefined;
  private roles: Array<string> | undefined;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.host + "/login", data, {observe: 'response'});
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  private parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt!!)
    this.username = objJWT.sub;
    this.roles = objJWT.roles;
  }

  isAdmin() {
    return (this.roles != undefined) ? this.roles.indexOf("ADMIN") >= 0 : false;
  }

  isAuthenticated() {
    return this.roles != undefined; // if user have roles so its authenticated
  }

  loadToken() {
    this.jwt = localStorage.getItem("token")!!;
    this.parseJWT();
  }

  logout() {
    localStorage.removeItem("token");
    this.initParams();
  }

  private initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
