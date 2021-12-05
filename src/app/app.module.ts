import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddCategoriesComponent } from './components/add-categories/add-categories.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import {TrainingComponent} from "./components/training/training.component";
import {BorderCardDirective} from "./directives/border-card.directive";
import {AvailableColorPipe} from "./pipe/available-color.pipe";
import { TrainingDetailsComponent } from './components/training-details/training-details.component';
import { EditTrainingComponent } from './components/edit-training/edit-training.component';
import {AddTrainingComponent} from "./components/add-training/add-training.component";
import { ViewReservationsComponent } from './components/view-reservations/view-reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    BorderCardDirective,
    AvailableColorPipe,
    LoginComponent,
    AddCategoriesComponent,
    AddTrainingComponent,
    NavBarComponent,
    RegisterComponent,
    TrainingComponent,
    TrainingDetailsComponent,
    EditTrainingComponent,
    ViewReservationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
