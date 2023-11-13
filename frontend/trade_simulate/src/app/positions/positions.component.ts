import { Component, OnInit } from '@angular/core';
import { WatchlistdataService } from '../service/data/watchlistdata.service';
import { NumberValueAccessor } from '@angular/forms';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';

export class Trades {
  constructor(
    public symbol: string,
    public buyPrice: number,
    public currPrice: number,
    public quantity: number,
    public pnl: number
  ){

  }
}

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})



export class PositionsComponent implements OnInit {
  constructor(
    public tradesservice: WatchlistdataService,
    public authService: SimpleauthenticationService
  ){}

  stocks: number[] = [];
  trades: any[] = [];
  currTrades: Trades[] = [];

  ngOnInit(){
    this.getPositions();
  }

  getPositions(){
    let username = this.authService.getAuthenticatedUser();
    console.log(username);
    if(username !=null){
      this.tradesservice.getAllTrades(username).subscribe(
        response => {
          console.log(response);
          this.trades = response.trades;
          this.preparePositions();
        }
      )
    }
  }

  preparePositions(){
    for(let i = 0;i<this.trades.length;i++){
      this.tradesservice.getStockPrice(this.trades[i].symbol).subscribe(
        response => {
          let pnl = (Number(response["data"]["current_price"])-this.trades[i].price)*this.trades[i].quantity
          this.currTrades.push(new Trades(this.trades[i].symbol, 
                                          this.trades[i].price, 
                                          Number(response["data"]["current_price"]),
                                          this.trades[i].quantity,
                                          Number(pnl.toFixed(2))));
        }
      )
    }
  }

}
