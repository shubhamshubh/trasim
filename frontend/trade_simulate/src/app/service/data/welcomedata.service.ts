import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message:string){ }
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

  executeHelloWorldNameService(name: string){
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/${name}`, {headers});
  }

  createBasicAuthenticationHttpHeader(){
    let username = 'shubhamshubh';
    let password = 'shubham01';
    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }

}
