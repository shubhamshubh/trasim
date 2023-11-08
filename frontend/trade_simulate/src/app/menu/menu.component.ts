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

  ngOnInit() {
    this.isUserLoggedIn = this.simpleautheticationService.isUserLoggedIn();
  }
}
