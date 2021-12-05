import {Component, OnInit} from '@angular/core';
import {TrainingService} from "../../services/training.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {Training} from "../../model/training.model";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  title: String = "ALL TRAINING"
  training;
  categories;
  editPhoto;
  currentTraining;
  progress;
  private selectedFiles;
  private currentUploadFile;
  private timeStamp;

  constructor(private trainingService: TrainingService,
              private categoryService: CategoryService,
              private authenticationService : AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetAllTraining();
    this.onGetAllCategories();
  }

  onGetAllTraining() {
    this.trainingService.getAllTraining()
      .subscribe({
        next: (response) => {
          this.training = response
        },
        error: (error) => console.error(error)
      })
  }

  onGetAvailableTraining() {
    this.trainingService.getAvailableTraining()
      .subscribe({
        next: (response) => {
          this.title = "AVAILABLE TRAINING"
          this.training = response
        },
        error: (error) => console.error(error)
      })
  }

  onGetAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (data) => {
          this.categories = data
        },
        error: (error) => console.error(error)
      })
  }

  getPhoto(id) {
    // ts is a workaround allow us to see the new photo after using update photo
    return this.trainingService.host + '/photoTraining/' + id +'?ts=' + this.timeStamp;
  }

  onTrainingByCategory(category) {
    this.trainingService.getTrainingByCategory(category)
      .subscribe({
        next: (response) => {
          this.title = "TRAINING of Category: " + category.name.toUpperCase()
          this.training = response
        },
        error: (error) => console.error(error)
      })
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

  isAdmin() {
    return this.authenticationService.isAdmin()
  }

  onDetailsTraining(training: Training) {
    let url = btoa(training._links.training.href)

    this.router.navigateByUrl("training-details/" + url)
  }
}
