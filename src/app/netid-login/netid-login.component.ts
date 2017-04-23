import { Component } from '@angular/core';
import { AF } from "../../providers/af";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-netid-login',
  templateUrl: './netid-login.component.html',
  styleUrls: ['./netid-login.component.css']
})
export class NetIdLoginComponent {
  constructor(public afService: AF, private router: Router) {}
  // professional form handling
  onSubmit(f: NgForm) {
    this.router.navigate(['/home']);
    this.afService.getSchedule(f.value.Username, f.value.Password);
  }
  skipLine() {
    this.router.navigate(['/home']);
    this.afService.getCachedSchedule();
  }
}
