import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/${name}`);
  }

}
