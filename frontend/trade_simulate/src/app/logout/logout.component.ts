import { Component } from '@angular/core';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor (
    public simpleauthenticationService: SimpleauthenticationService
  ){

  }

  ngOnInit() {
    this.simpleauthenticationService.logout();
  }

}
