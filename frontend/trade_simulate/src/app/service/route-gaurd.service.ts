import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SimpleauthenticationService } from './simpleauthentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService implements CanActivate{

  constructor(
    public simpleauthenticationService: SimpleauthenticationService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.simpleauthenticationService.isUserLoggedIn()){
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }
  
}

