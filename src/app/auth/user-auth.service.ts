import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
//import * as firebase from 'firebase'
import firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  firebase = firebase;
  user!: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, public router: Router) {
    this.subUserlog();
  }

  currentUSer: any;

  subUserlog() {
    this.afAuth.authState.subscribe((res: any) => {
      this.currentUSer = res.displayName;
      localStorage.setItem('authState', JSON.stringify(res));
      return res
    });
  }

  getLogUser() {
    let user = localStorage.getItem('authState');
    if(user) {
      return true
    }
    else {
      return false
    }
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new this.firebase.auth.GoogleAuthProvider())
      .catch(err => alert(err));
      this.router.navigate(['dashboard'])
  }

  async LogOut() {
    await this.afAuth.signOut()
    .then(() => {localStorage.removeItem('authState');
    this.router.navigate(['']);
  });
  }

  //   get isLoggedIn(): boolean {
  //     const  user  =  JSON.parse(localStorage.getItem('user'));
  //     return  user  !==  null;
  // }


}
