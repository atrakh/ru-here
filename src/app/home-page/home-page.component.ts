import { Component } from '@angular/core';
import { AF } from "../../providers/af";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent{
  mutual:any;
  constructor(public afService: AF) {
    this.mutual = this.afService.mutualClasses;
  }
}
