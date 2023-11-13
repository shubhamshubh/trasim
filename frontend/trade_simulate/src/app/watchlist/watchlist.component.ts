import { Component } from '@angular/core';
import { WatchlistdataService } from '../service/data/watchlistdata.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';

export class Stock{
  constructor(
    public symbol: string,
    public price: number
  ){}
}

export class stockdata {
  constructor(
    public s: string,
    public t: Array<number>,
    public c: Array<number>,
    public l: Array<number>,
    public h: Array<number>,
    public o: Array<number>
  ){

  }
}

export class showStock {
  constructor(
    public symbol: string,
    public timestamps: Array<number>,
    public closing: Array<number>,
    public datetime: Array<Date>
  ){

  }
}


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {

  public stock_price: number = 0.0;
  public watchListStocks: string[] = []
  public currentStock = '';
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLabels: string[] = [];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Price in $' },
  ];
  message = '';
  fail_message = '';
  stocks: Array<Stock> = [];
  newStock = '';
  stockdata: any;
  displayData: any;
  data: any;
  current_price: number = 0.0;
  buyQuantity: number = 0;
  sellQuantity: number = 0;
  constructor (
    private watchlistService: WatchlistdataService,
    private authService: SimpleauthenticationService
    ){}
  ngOnInit(){
    this.refreshWatchList();
  }

  refreshWatchList(){
    let username = this.authService.getAuthenticatedUser();
    this.stocks = []
    if(username != null) {
      this.watchlistService.retriveWatchlist(username).subscribe(
        response => {
          console.log(response);
          this.watchListStocks = response;
        }
      )
    }
  }

  deleteStock(symbol: string){
    let username = this.authService.getAuthenticatedUser();
    if(username != null) {
      this.watchlistService.deleteStocks(username, symbol).subscribe(
        response => {
          console.log(response);
          this.message = `Successfully Deleted ${symbol} from watchlist`;
          this.fail_message = '';
          this.refreshWatchList();
        }
      )
    }
  }

  addStock(symbol: string){
    this.newStock = ''
    let username = this.authService.getAuthenticatedUser();
    if(username != null) {
      this.watchlistService.addStocks(username, symbol).subscribe(
        response => {
          console.log(response);
          this.message = `Successfully Added ${symbol} to watchlist`;
          this.fail_message = '';
          this.refreshWatchList();
        }
      )
    }
  }

  getCurrPrice(symbol: string){
    console.log(symbol)
    let username = this.authService.getAuthenticatedUser();
    if(username != null) {
      this.watchlistService.getStockPrice(symbol).subscribe(
        response => {
          console.log(response["data"]["current_price"]);
          this.stock_price = response["data"]["current_price"]
        }
      )
    }
    return 0;
  }

  displayStock(symbol: string){
    if(this.currentStock == symbol)
      return;
    this.currentStock = symbol
    this.displayData = null;
    this.lineChartLabels = [];
    this.lineChartData = [
      { data: [], label: 'Price in $' },
    ];
    this.watchlistService.getStockData(symbol).subscribe(
      response => {
        this.stockdata = response;
        console.log(this.stockdata);
        let dateArray: Date[] = new Array(300);
        this.displayData = new showStock(symbol, this.stockdata.t, this.stockdata.c, dateArray);
        for(let i = 0;i<300;i++){
          this.displayData.datetime[i] = new Date(this.displayData.timestamps[i]*1000);
        }
        this.loadData();
        this.refreshWatchList();
      }
    )


  }
  loadData(): void {
    for(let i = 0;i<300;i++){
      let date = new Date(this.displayData.timestamps[i]*1000);
      this.lineChartLabels.push(date.toISOString());
      this.lineChartData[0].data.push(this.displayData.closing[i]);
    }
  }
  toggleBuyPopup(symbol: string) {
    for(let i=0;i<this.watchListStocks.length;i++)
      this.closeSellPopup(this.watchListStocks[i], 1);
    for(let i=0;i<this.watchListStocks.length;i++)
      this.closeBuyPopup(this.watchListStocks[i], 1);
    this.getCurrPrice(symbol);
    let popup = document.getElementById("buyPopup" + symbol);
    console.log("Yes");
    if(popup!=null)
      popup.style.display = (popup.style.display === "block") ? "none" : "block";
  }

  closeBuyPopup(symbol:string, flag:number) {
    let popup = document.getElementById("buyPopup" + symbol);
    if(popup!=null)
    popup.style.display = "none";
    if(flag)
      return;
    let username = this.authService.getAuthenticatedUser();
    if(username != null) {
      this.watchlistService.makeBuyTrade(username, symbol, this.stock_price, this.buyQuantity).subscribe(
        response => {
          console.log(response);
          this.message = `Successfully executed the trade`;
          this.fail_message = '';
        },
        error => {
          this.fail_message = "Failed to execute the trade: Insufficient funds";
          this.message = ''
        }
      )
    }
  }

  toggleSellPopup(symbol:string) {
    for(let i=0;i<this.watchListStocks.length;i++)
      this.closeSellPopup(this.watchListStocks[i], 1);
    for(let i=0;i<this.watchListStocks.length;i++)
      this.closeBuyPopup(this.watchListStocks[i], 1);
    this.getCurrPrice(symbol);
    let popup = document.getElementById("sellPopup" + symbol);
    console.log("Yes");
    if(popup!=null)
      popup.style.display = (popup.style.display === "block") ? "none" : "block";
  }

  closeSellPopup(symbol: string, flag: number) {
    let popup = document.getElementById("sellPopup" + symbol);
    if(popup!=null)
      popup.style.display = "none";
    if(flag)
      return;
    let username = this.authService.getAuthenticatedUser();
    if(username != null) {
        this.watchlistService.makeSellTrade(username, symbol, this.stock_price, this.sellQuantity).subscribe(
        response => {
          console.log(response);
          this.message = `Successfully executed the trade`;
          this.fail_message = '';
        },
        error => {
          this.fail_message = "Failed to execute the trade: Invalid trade";
          this.message = ''
        }
      )
    }
  }
  //   new stock('CSCO', 'Cisco', 54.57),
  //   new stock('TWLO', 'Twilio', 68.56),
  //   new stock('MSFT', 'Microsoft', 127.80)
  // ]
  // stock = {
  //   name: 'CSCO',
  //   price: 54.57
  // }
}

