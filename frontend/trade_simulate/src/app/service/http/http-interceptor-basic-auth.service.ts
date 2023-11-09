import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleauthenticationService } from '../simpleauthentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor{

  constructor(
    private simpleauthenticationService: SimpleauthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let basicAuthHeaderString = this.simpleauthenticationService.getAuthenticatedToken();
    let username = this.simpleauthenticationService.getAuthenticatedUser()

    if (basicAuthHeaderString && username){

      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }
    return next.handle(request);
  }
}
