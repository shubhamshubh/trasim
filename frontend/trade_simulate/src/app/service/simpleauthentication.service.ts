import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.consts';
import { WelcomedataService } from './data/welcomedata.service';

@Injectable({
  providedIn: 'root'
})
export class SimpleauthenticationService {

  constructor(private http: HttpClient,
    public service:WelcomedataService) { }

  // authenticate(user: string, password: string){
  //   if(user==="shubhamshubh" && password === "shubham01"){
  //     sessionStorage.setItem('authenticateUser', user);
  //     return true;
  //   }
  //   return false;

  // }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser');
    return !(user==null)
  }

  logout(){
    sessionStorage.removeItem('authenticateUser');
    sessionStorage.removeItem('token')
  }

  executeSimpleLoginService(username: string, password: string){
    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Username: username,
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticateUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  executeSimpleSignUpService(username: string, password: string){

    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Username: username,
      Authorization: basicAuthHeaderString
    })
    
    return this.http.post<AuthenticationBean>(`${API_URL}/basicauth`, null, {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticateUser', username);
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem('authenticateUser');
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem('token');
    return null;
  }
}

export class AuthenticationBean{
  constructor(public message: String){

  }
}
