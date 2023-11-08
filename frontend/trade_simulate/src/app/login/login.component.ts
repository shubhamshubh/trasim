import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';

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

  constructor(private router: Router,
    public simpleauthenticationService: SimpleauthenticationService) {
  }

  handleLogin() {
    if(this.simpleauthenticationService.authenticate(this.username, this.password)){
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    }
    else{
      this.invalidLogin = true
    }
  }
}
