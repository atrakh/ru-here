import { Injectable } from "@angular/core";
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Http, Response, HttpModule } from '@angular/http';
import { Router } from "@angular/router";

@Injectable()
export class AF {
  id:string;
  mutualClasses:Array<Object>;
  constructor(public af: AngularFire, private http: Http, private router: Router) {}
  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  getFriends(data) {
    this.http.get('https://graph.facebook.com/v2.0/me?fields=friends&access_token='+data.facebook.accessToken).subscribe(res => {
      this.id = res.json().id
      this.af.database.object('/users/'+this.id).update({'name':data.auth.displayName})
      var arr = res.json().friends.data
      var friends = []
      for(var i = 0; i < arr.length; i++) {
        friends.push(arr[i].id);
      }
      const user = this.af.database.object('/users/'+this.id+'/friends');
      user.set(friends);
    });
  }

  // yeah, i know
  getSchedule(netid, password) {
    this.http.get('http://localhost:8000/schedules?netid='+netid+'&password='+password).subscribe(res => {
      const user = this.af.database.object('/users/'+this.id+'/schedule');
      user.set(res.json());
      this.getCachedSchedule();
    });
  }
  
  // eww
  getCachedSchedule() {
    this.mutualClasses = []
    var users = this.af.database.object('/users');
    users.subscribe(res => {
      var user = res[this.id];
      var userSchedule = user.schedule
      for (var i = 0; i < user.friends.length; i++) {
        var friend = user.friends[i];
        var friendSchedule = res[friend].schedule
        for (var j = 0; j < userSchedule.length; j++) {
          for (var k = 0; k < friendSchedule.length; k++) {
            if (userSchedule[j].location === friendSchedule[k].location && userSchedule[j].day === friendSchedule[k].day && userSchedule[j].courseNum === friendSchedule[k].courseNum && userSchedule[j].time === friendSchedule[k].time) {
              this.mutualClasses.push({
                title: userSchedule[j].title,
                day: userSchedule[j].day,
                location: userSchedule[j].location,
                time: userSchedule[j].time,
                mutual: res[friend].name
              });
            }
          }
        }
      }
    });
  }
  /**
   * Logs out the current user
   */
  logout() {
    return this.af.auth.logout();
  }
}
