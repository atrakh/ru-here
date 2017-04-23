import { Component, NgModule } from '@angular/core';
import { AF } from "../../providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(public afService: AF, private router: Router) {}
  login() {
    this.afService.loginWithFacebook().then((data) => {
      this.afService.getFriends((data as any));
      // Send them to the homepage if they are logged in
      this.router.navigate(['netid_login']);
    })
  }
}
