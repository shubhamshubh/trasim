import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomedataService } from '../service/data/welcomedata.service';
import { WatchlistdataService } from '../service/data/watchlistdata.service';

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
  trades: any = [];

  constructor(private route:ActivatedRoute,
    public service:WelcomedataService,
    public tradesservice: WatchlistdataService) {

  }

  ngOnInit(){

    this.name = this.route.snapshot.params['name']
    this.getAllTrades(this.name);
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
    this.pnl = response.pnl.toFixed(2);
    
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
          this.pnl = this.pnl + (response["data"]["current_price"]-trades[i].price)*trades[i].quantity;
          console.log(this.pnl);
        }
      )
    }
    this.getWelcomeMessageWithParam();
  }
}
