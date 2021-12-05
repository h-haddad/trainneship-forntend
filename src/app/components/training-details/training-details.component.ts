import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingService} from "../../services/training.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Training} from "../../model/training.model";
import {AuthenticationService} from "../../services/authentication.service";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../model/reservation.model";
import {Employee} from "../../model/employee.model";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  editPhoto;
  currentTraining: Training;
  progress;
  private selectedFiles;
  private currentUploadFile;
  private timeStamp;
  isReserved = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private trainingService: TrainingService,
              private authenticationService: AuthenticationService,
              private reservationService: ReservationService) { }

  ngAfterViewChecked() {
    this.checkReservation(this.currentTraining.id)
  }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params["url"]);

    this.trainingService.getTrainingDetails(url)
      .subscribe({
        next: (training) => {
          this.currentTraining = training;
        },
        error: (error) => console.error(error)
      });
  }

  getPhoto(id) {
    // ts is a workaround allow us to see the new photo after using update photo
    return this.trainingService.host + '/photoTraining/' + id + '?ts=' + this.timeStamp;
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  onEditTraining(training) {
    let url = btoa(training._links.training.href);

    this.router.navigateByUrl("editTraining/" + url);
  }

  onDeleteTraining(training: Training) {
    let validate = confirm("Are you sure about deleting this training?");

    if(validate) {
      this.trainingService.DeleteTraining(training)
        .subscribe({
          next: (training) => {
            this.router.navigate(['']);
          },
          error: (error) => console.error(error)
        });
    }
  }

  onEditPhoto(training) {
    this.currentTraining = training;
    this.editPhoto = true;
    this.progress = 0;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentUploadFile = this.selectedFiles.item(0)
    this.trainingService.uploadTrainingPhoto(this.currentUploadFile, this.currentTraining.id)
      .subscribe({
        next: (event) => {
          if(event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if(event instanceof HttpResponse) {
            this.timeStamp = Date.now();
          }
        },
        error: (error) => {
          alert("Problem on upload photo" + JSON.parse(error.error).message)
        }
      })
  }

  checkReservation(training: number) {
   this.reservationService.checkReservation(training)
     .subscribe({
       next: (response) => {
         this.isReserved = response;
       },
       error: (error) => console.log(error)
     })
  }

  bookTraining(trainingId: number) {
    this.reservationService.SaveTraining(trainingId)
      .subscribe({
        next: () => {},
        error: (error) => console.log(error)
      })
  }
}
