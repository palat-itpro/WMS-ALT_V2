import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  firebase = firebase.default

  constructor(private afAuth:AngularFireAuth , public router: Router) {

    this.afAuth.authState.subscribe((res: any) => {
      localStorage.setItem('authState',res)
    });

   }


  getLogUser(){
    let authState = localStorage.getItem('authstate')
    console.log(authState);

  }

  async  loginWithGoogle(){
    await  this.afAuth.signInWithPopup(new this.firebase.auth.GoogleAuthProvider())
    .catch(err => alert(err));
    this.router.navigate(['']);
}

//   get isLoggedIn(): boolean {
//     const  user  =  JSON.parse(localStorage.getItem('user'));
//     return  user  !==  null;
// }


}
