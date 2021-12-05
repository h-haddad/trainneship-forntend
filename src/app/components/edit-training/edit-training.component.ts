import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingService} from "../../services/training.service";
import {Training} from "../../model/training.model";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent implements OnInit {
  trainingFormGroup: FormGroup;
  categories;
  levels: string[] = ["Beginner", "Fundamental", "Intermediate", "Advanced"];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private trainingService: TrainingService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder) { }
  url = atob(this.route.snapshot.params["url"]);

  ngOnInit(): void {
    this.trainingService.getTrainingDetails(this.url)
      .subscribe({
        next: (training) => {
          this.trainingFormGroup = this.formBuilder.group({
            id:[training.id],
            title:[training.title, [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z ]+$")]],
            shortDescription:[training.shortDescription, Validators.required],
            description:[training.description, Validators.required],
            level:[training.level, Validators.required],
            duration:[training.duration, [Validators.required, Validators.max(50)]],
            available:[training.available, Validators.required],
            category:[training._links.category.href, Validators.required],
          })
        },
        error: (error) => console.error(error)
      })

    this.categoryService.getAllCategories()
      .subscribe({
        next: (data) => {
          this.categories = data
        },
        error: (error) => console.error(error)
      })
  }

  onUpdateTraining() {
    if(this.trainingFormGroup.valid) {
      this.trainingService.UpdateTraining(this.url, this.trainingFormGroup.value)
        .subscribe({
          next: (data) => {
            alert("training updated successfully !")
            this.router.navigate([''])
          },
          error: (error) => console.error(error)
        })
    }
  }
}
