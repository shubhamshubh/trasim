import { Component } from '@angular/core';
import { WatchlistdataService } from '../service/data/watchlistdata.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { SimpleauthenticationService } from '../service/simpleauthentication.service';


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
  delete_success_message = '';
  add_success_message = '';
  stocks: any;
  newStock = '';
  stockdata: any;
  displayData: any;
  data: any;
  constructor (
    private watchlistService: WatchlistdataService,
    private authService: SimpleauthenticationService
    ){}
  ngOnInit(){
    this.refreshWatchList();
  }

  refreshWatchList(){
    let username = this.authService.getAuthenticatedUser();
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
          this.delete_success_message = `Successfully Deleted ${symbol} from watchlist`;
          this.add_success_message = ''
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
          this.add_success_message = `Successfully Added ${symbol} to watchlist`;
          this.delete_success_message = ''
          this.refreshWatchList();
        }
      )
    }
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
  toggleBuyPopup() {
    this.closeSellPopup();
    const popup = document.getElementById("buyPopup");
    console.log("Yes");
    if(popup!=null)
      popup.style.display = (popup.style.display === "block") ? "none" : "block";
  }

  closeBuyPopup() {
    let popup = document.getElementById("buyPopup");
    if(popup!=null)
      popup.style.display = "none";
  }

  toggleSellPopup() {
    this.closeBuyPopup();
    const popup = document.getElementById("sellPopup");
    console.log("Yes");
    if(popup!=null)
      popup.style.display = (popup.style.display === "block") ? "none" : "block";
  }

  closeSellPopup() {
    let popup = document.getElementById("sellPopup");
    if(popup!=null)
      popup.style.display = "none";
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

