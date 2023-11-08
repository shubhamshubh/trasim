import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomedataService } from '../service/data/welcomedata.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  message = 'Some random message'
  messagefromservice = ''
  name = ''

  constructor(private route:ActivatedRoute,
    public service:WelcomedataService) {

  }

  ngOnInit(){
    console.log(this.message)
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessageWithParam(){
    this.service.executeHelloWorldNameService(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    console.log("get welcome message");
  }

  handleSuccessfulResponse(response: any){

    this.messagefromservice = response.message;
  }

  handleErrorResponse(error: any){
    this.messagefromservice = error.error.message
  }

}
