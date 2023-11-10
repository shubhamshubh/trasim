import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';
import { WelcomedataService } from '../service/data/welcomedata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = 'shubhamshubh'
  password = ''
  error_message = 'Invalid Credentials'
  invalidLogin = false
  login = true;
  signup = false;

  constructor(private router: Router,
    public simpleauthenticationService: SimpleauthenticationService,
    public balanceService: WelcomedataService) {
  }

  handleLogin() {
    this.simpleauthenticationService.executeSimpleLoginService(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      } 
    )
  }

  handleSignUp() {
    this.simpleauthenticationService.executeSimpleSignUpService(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['welcome', this.username])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
      } 
    )
    this.balanceService.initiateBalanceService(this.username).subscribe()
  }
  
  switchToSignUp(){
    this.login = false;
    this.signup = true;
  }
  switchToLogin(){
    this.login = true;
    this.signup = false;
  }
}
