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
  showTrades: Trades[] = [];
  currPNL: Map<string, number> = {
    clear: function (): void {
      throw new Error('Function not implemented.');
    },
    delete: function (key: string): boolean {
      throw new Error('Function not implemented.');
    },
    forEach: function (callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any): void {
      throw new Error('Function not implemented.');
    },
    get: function (key: string): number | undefined {
      throw new Error('Function not implemented.');
    },
    has: function (key: string): boolean {
      throw new Error('Function not implemented.');
    },
    set: function (key: string, value: number): Map<string, number> {
      throw new Error('Function not implemented.');
    },
    size: 0,
    entries: function (): IterableIterator<[string, number]> {
      throw new Error('Function not implemented.');
    },
    keys: function (): IterableIterator<string> {
      throw new Error('Function not implemented.');
    },
    values: function (): IterableIterator<number> {
      throw new Error('Function not implemented.');
    },
    [Symbol.iterator]: function (): IterableIterator<[string, number]> {
      throw new Error('Function not implemented.');
    },
    [Symbol.toStringTag]: ''
  };

  ngOnInit(){

    this.getPositions();
    setInterval(()=> {
      this.preparePositions();
    }, 5000);
    setInterval(()=> {
      this.currTrades.sort((a, b) => a.symbol.localeCompare(b.symbol));
    }, 10);
    // for(let i =0;;){
      // this.getPositions();
    //   this.delay(50000);
    // }

  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
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
    this.trades.sort((a, b) => a.symbol.localeCompare(b.symbol));
    this.currTrades = []
    console.log(this.trades);
    for(let i = 0;i<this.trades.length;i++){
      this.tradesservice.getStockPrice(this.trades[i].symbol).subscribe(
        response => {
          let pnl = (Number(response["data"]["current_price"])-this.trades[i].price)*this.trades[i].quantity
          this.currTrades.push(new Trades(this.trades[i].symbol, 
                                          this.trades[i].price.toFixed(2), 
                                          Number(response["data"]["current_price"]),
                                          this.trades[i].quantity,
                                          Number(pnl.toFixed(2))));
        }
      )
    }
  }

  
  updatePositions(){
    console.log(this.trades);
    for(let i = 0;i<this.trades.length;i++){
      this.tradesservice.getStockPrice(this.trades[i].symbol).subscribe(
        response => {
          let pnl = (Number(response["data"]["current_price"])-this.trades[i].price)*this.trades[i].quantity
          let price = Number(response["data"]["current_price"]);
          for(let j = 0;j<this.currTrades.length;j++)
          {
              if(this.currTrades[j].symbol == response["data"]["symbol"])
              {
                this.currTrades[j].pnl = Number(pnl.toFixed(2));
                this.currTrades[j].currPrice = price;
                break;
              }
          }
          
        }
      )
    }
  }

}
