import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomedataService } from '../service/data/welcomedata.service';
import { WatchlistdataService } from '../service/data/watchlistdata.service';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{

  messagefromservice = 'Some random message'
  name = ''
  balance: number = 0.0
  pnl:number = 0.0
  trades: any = [];

  constructor(private route:ActivatedRoute,
    public service:WelcomedataService,
    public tradesservice: WatchlistdataService,
    public authService: SimpleauthenticationService) {

  }

  ngOnInit(){
    let username = this.authService.getAuthenticatedUser();
    if(username !=null)
      this.name = username;
    this.getAllTrades(this.name);
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
    this.balance = response.balance.toFixed(2);
    
  }

  handleErrorResponse(error: any){
    this.messagefromservice = error.error.message
  }

  getAllTrades(username: string){
    console.log(username);
    this.tradesservice.getAllTrades(username).subscribe(
      response => {
        console.log(response);
        this.trades = response.trades;
        this.calculatePNL(this.trades);
      }
    )
  }

  calculatePNL(trades: any[]){
    this.pnl = 0.0
    for(let i = 0;i<trades.length;i++){
      this.tradesservice.getStockPrice(trades[i].symbol).subscribe(
        response => {
          console.log(this.pnl);
          this.pnl = this.pnl + (Number(response["data"]["current_price"])-trades[i].price)*trades[i].quantity;
          this.pnl = Number(this.pnl.toFixed(2));
          console.log(this.pnl);
        }
      )
    }
  }
}
