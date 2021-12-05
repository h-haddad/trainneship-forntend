import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";
import {Reservation} from "../model/reservation.model";
import {Category} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  host: String = environment.host;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  SaveTraining(trainingId: number) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});
    let payload = {username: this.authenticationService.username, trainingId: trainingId}

    const request = new HttpRequest('POST', this.host + '/saveReservation/' , payload, {
      reportProgress: true,
      responseType: 'text',
      headers: header
    });

    return this.http.request(request);
  }

  checkReservation(trainingId: number): Observable<boolean> {
    let url = this.host + '/checkReservation/' + this.authenticationService.username +'/' + trainingId

    return this.http.get<boolean>(url);
  }

  getAllReservations(): Observable<Reservation[]> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get<Reservation[]>(this.host + "/reservations", {headers:header});
  }

  getInfos(url: string) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get(url, {headers:header});
  }

}
