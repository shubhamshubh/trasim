import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stockdata } from 'src/app/watchlist/watchlist.component';
import { API_URL } from '../../app.consts';


@Injectable({
  providedIn: 'root'
})
export class WatchlistdataService {

  constructor(
    public http:HttpClient
  ) { }

  retriveWatchlist(name: String){
    return this.http.get<string[]>(`${API_URL}/watchlist/${name}`);
  }

  deleteStocks(username: string, symbol: string){
    let headers = new HttpHeaders({
      Username: username,
      Stock: symbol
    })
    return this.http.put(`${API_URL}/deletFromWatchlist`,null, {headers});
  }

  addStocks(username: string, symbol: string){
    let headers = new HttpHeaders({
      Username: username,
      Stock: symbol
    })
    return this.http.post(`${API_URL}/addToWatchlist`,null, {headers});
  }

  getStockData(symbol: String){
    return this.http.get<stockdata>(`https://priceapi.moneycontrol.com/globaltechCharts/usMarket/stock/history?symbol=${symbol}%3AUS&resolution=5&from=1699406014&to=1699693375&countback=300&currencyCode=USD`);
  }


}
