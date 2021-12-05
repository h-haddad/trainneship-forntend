import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingService} from "../../services/training.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {
  trainingFormGroup: FormGroup;
  categories;
  levels: string[] = ["Beginner", "Fundamental", "Intermediate", "Advanced"];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private trainingService: TrainingService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trainingFormGroup = this.formBuilder.group({
      title:["", [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z ]+$")]],
      shortDescription:["", Validators.required],
      description:["", Validators.required],
      level:["Beginner", Validators.required],
      duration:[1, [Validators.required, Validators.max(50)]],
      available:[true, Validators.required],
      category:["", Validators.required],
    })

    this.categoryService.getAllCategories()
      .subscribe({
        next: (data) => {
          this.categories = data
        },
        error: (error) => console.error(error)
      })
  }

  onSaveTraining() {
    this.trainingService.SaveTraining(this.trainingFormGroup.value)
      .subscribe({
        next: (training) => {
          let url = btoa(training._links.training.href)

          this.router.navigateByUrl("training-details/" + url)
        },
        error: (error) => console.error(error)
      })
  }
}
