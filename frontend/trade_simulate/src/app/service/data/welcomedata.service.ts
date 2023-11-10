import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message:string){ }
}

export class Balance {
  constructor(public message:string,
              public balance:number,
              public pnl:number){ }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomedataService {

  constructor(
    public http:HttpClient
  ) { }

  executeHelloWorldService(){
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean");
  }

  // executeHelloWorldNameService(name: string){
  //   let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

  //   let headers = new HttpHeaders({
  //     Authorization: basicAuthHeaderString
  //   })

  //   return this.http.get<Balance>(`http://localhost:8080/hello-world/${name}`, {headers});
  // }

  executeBalanceService(name: string){
    return this.http.get<Balance>(`http://localhost:8080/getBalance/${name}`);
  }

  initiateBalanceService(username: string){
    let headers = new HttpHeaders({
      Username: username
    })
    return this.http.post<Balance>(`http://localhost:8080/addBalance`, null, {headers});
  }


  // createBasicAuthenticationHttpHeader(){
  //   let username = 'shubhamshubh';
  //   let password = 'shubham01';
  //   let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }

}
