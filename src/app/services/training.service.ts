import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";

import {Training} from "../model/training.model";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  host: String = environment.host;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getAllTraining():Observable<Training[]> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get<Training[]>(this.host + "/trainings", {headers:header});
  }

  getAvailableTraining():Observable<Training[]> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get<Training[]>(this.host + "/trainings/search/availableTraining", {headers:header});
  }

  getTrainingByCategory(c) {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get<Training[]>(this.host + "/categories/" +c.id + "/training", {headers:header});
  }

  uploadTrainingPhoto(file: File, idTraining: number): Observable<HttpEvent<{}>> {
    let formData : FormData = new FormData();
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    formData.append('file', file);

    const request = new HttpRequest('POST', this.host + '/uploadPhoto/' + idTraining, formData, {
      reportProgress: true,
      responseType: 'text',
      headers: header
    });

    return this.http.request(request);
  }

  getTrainingDetails(url: string):Observable<Training> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.get<Training>(url, {headers:header});
  }

  SaveTraining(training: Training):Observable<Training> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.post<Training>(this.host + "/trainings", training, {headers:header});
  }

  UpdateTraining(url, training: Training):Observable<Training> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.patch<Training>(url, training, {headers:header});
  }

  DeleteTraining(training: Training):Observable<void> {
    let header = new HttpHeaders({"Authorization":'Bearer ' + this.authenticationService.jwt});

    return this.http.delete<void>(this.host + "/trainings/" +training.id, {headers:header});
  }
}
