import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AddCategoriesComponent} from "./components/add-categories/add-categories.component";
import {RegisterComponent} from "./components/register/register.component";
import {TrainingComponent} from "./components/training/training.component";
import {TrainingDetailsComponent} from "./components/training-details/training-details.component";
import {EditTrainingComponent} from "./components/edit-training/edit-training.component";
import {AddTrainingComponent} from "./components/add-training/add-training.component";
import {ViewReservationsComponent} from "./components/view-reservations/view-reservations.component";

const routes: Routes = [
  {path:"training", component:TrainingComponent},
  {path:"training-details/:url", component:TrainingDetailsComponent},
  {path:"editTraining/:url", component:EditTrainingComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"addCategories", component:AddCategoriesComponent},
  {path:"addTraining", component:AddTrainingComponent},
  {path:"viewReservations", component:ViewReservationsComponent},
  {path:"", redirectTo:"training", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
