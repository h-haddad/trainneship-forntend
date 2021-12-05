import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit {
  reservations;
  employee;
  training;
  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations()
      .subscribe({
        next: (reservations) => {
          this.reservations = reservations;
        },
        error: (error) => console.log(error)
      })
  }

  getEmployeeInfos(href: string) {
    this.reservationService.getInfos(href)
      .subscribe({
        next: (employee) => {
          this.employee = employee;
        },
        error: (error) => console.log(error)
      })
    return this.employeeToString();
  }

  getTrainingInfos(href: string) {
    this.reservationService.getInfos(href)
      .subscribe({
        next: (training) => {
          this.training = training;
        },
        error: (error) => console.log(error)
      })
    return this.trainingToString();
  }

  employeeToString() {
    return this.employee.firstName + " - "
    + this.employee.lastName + " - "
    + this.employee.email + " - "
    + this.employee.phoneNumber;
  }

  trainingToString() {
    return this.training.title + " - "
      + this.training.level + " - "
      + this.training.duration;
  }
}
