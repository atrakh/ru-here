import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from "@angular/router";
import { AF } from "../providers/af";
import { HomePageComponent } from './home-page/home-page.component';
import { NetIdLoginComponent } from './netid-login/netid-login.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CONSTANTS } from './constants'

export const firebaseConfig = CONSTANTS.firebaseConfig;

export const firebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup,
  scope: ['user_friends']
}
const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'netid_login', component: NetIdLoginComponent},
  { path: 'home', component: HomePageComponent}
];
@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [ AppComponent, LoginPageComponent, HomePageComponent, NetIdLoginComponent ],
  bootstrap: [ AppComponent ],
  providers: [ AF ]
})
export class AppModule {}
