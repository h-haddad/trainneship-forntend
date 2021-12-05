import { Component, OnInit } from '@angular/core';

import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string;

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.loadToken();
  }

  ngAfterViewChecked() {
    this.username = this.authenticationService.username;
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  logout() {
    this.authenticationService.logout();
  }
}
