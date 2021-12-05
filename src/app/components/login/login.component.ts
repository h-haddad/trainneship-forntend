import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {}

  onLogin(data: any) {
    this.authenticationService.login(data)
      .subscribe({
        next: (response) => {
          let jwt = response.headers.get('Authorization');
          this.authenticationService.saveToken(jwt!!);
          this.router.navigateByUrl("");
        },
        error: (error) => console.error(error)
      });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }
}
