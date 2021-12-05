import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordProblem = false

  constructor(private catalogueService: CatalogueService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveUser(value) {
    let url = this.catalogueService.host + "/register"
    let user = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phoneNumber: value.phoneNumber,
      username: value.username,
      password: value.password,
      confirmedPassword:value.confirmedPassword
    }

    if(value.password != value.confirmedPassword) {
      this.passwordProblem = true;
      return;
    }
    this.catalogueService.addUser(url, user)
      .subscribe({
        next: (data) => {
          alert("USER ADDED !")
          this.router.navigate(['']);
        },
        error: (error) => console.error(error)
      })
  }
}
