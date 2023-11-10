import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomedataService } from '../service/data/welcomedata.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  messagefromservice = 'Some random message'
  name = ''
  balance = 0.0
  pnl = 0.0

  constructor(private route:ActivatedRoute,
    public service:WelcomedataService) {

  }

  ngOnInit(){

    this.name = this.route.snapshot.params['name']
    this.getWelcomeMessageWithParam();

  }

  getWelcomeMessageWithParam(){
    this.service.executeBalanceService(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    console.log("get welcome message");
  }

  handleSuccessfulResponse(response: any){
    this.balance = response.balance
    this.pnl = response.pnl
    
  }

  handleErrorResponse(error: any){
    this.messagefromservice = error.error.message
  }

}
