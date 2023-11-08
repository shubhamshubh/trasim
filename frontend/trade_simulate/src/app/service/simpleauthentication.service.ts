import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleauthenticationService {

  constructor() { }

  authenticate(user: string, password: string){
    if(user==="shubhamshubh" && password === "shubham01"){
      sessionStorage.setItem('authenticateUser', user);
      return true;
    }
    return false;

  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser');
    return !(user==null)
  }

  logout(){
    sessionStorage.removeItem('authenticateUser');
  }
}
