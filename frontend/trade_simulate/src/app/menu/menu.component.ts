import { Component } from '@angular/core';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isUserLoggedIn:boolean = false;
  constructor (public simpleautheticationService: SimpleauthenticationService){

  }

  user = sessionStorage.getItem('authenticateUser');
  ngOnInit() {
    
    this.isUserLoggedIn = this.simpleautheticationService.isUserLoggedIn();
  }
}
