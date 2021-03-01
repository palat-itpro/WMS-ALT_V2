import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { MatDialog } from '@angular/material/dialog'
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public UserAuth: UserAuthService,public router: Router, public Dialog: MatDialog) { }

  isLoggedin: any = localStorage.getItem('authState');

  ngOnInit(): void {
    if( localStorage.getItem('authState') == null || undefined){
      this.Dialog.open(LoginDialogComponent, { disableClose: true,
        width: '90%',
        height: '90%',
      })
    }
    else {
      this.router.navigate(['dashboard']);
    }
  }

}


@Component({
  selector: 'app-login-dialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent {

  googleLogoURL = "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
  hsLogo = 'assets/Homestate Logo.png';

  constructor(public UserAuth: UserAuthService, public Dialog: MatDialog) { };


    async Login() {
      await this.UserAuth.loginWithGoogle()
      .then(() => {this.Dialog.closeAll()});
    }








}
