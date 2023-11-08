import { Component } from '@angular/core';
import { WatchlistdataService } from '../service/data/watchlistdata.service';

export class stock {
  constructor(
    public symbol: string,
    public company: string,
    public price: number
  ){

  }
}


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {

  stocks: any;
  constructor (
    private watchlistService: WatchlistdataService
    ){}
  ngOnInit(){
    this.watchlistService.retriveWatchlist("shubhamshubh").subscribe(
      response => {
        console.log(response);
        this.stocks = response;
      }
    )
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

