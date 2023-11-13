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

  getStockPrice(symbol: string){
    return this.http.get<any>(`https://priceapi.moneycontrol.com/pricefeed/usMarket/stock/${symbol}:US`);
  }

  deleteStocks(username: string, symbol: string){
    let headers = new HttpHeaders({
      Username: username,
      Stock: symbol
    })
    return this.http.put(`${API_URL}/deletFromWatchlist`,null, {headers});
  }

  getAllTrades(username: string){
    return this.http.get<any>(`${API_URL}/getTrades/${username}`);
  }

  makeBuyTrade(username: string, symbol: string, price: number, quantity: number){
    let headers = new HttpHeaders({
      Username: username,
      Symbol: symbol,
      Price: price,
      Quantity: quantity
    })
    return this.http.post(`${API_URL}/executeBuyTrade`,null, {headers});
  }

  makeSellTrade(username: string, symbol: string, price: number, quantity: number){
    let headers = new HttpHeaders({
      Username: username,
      Symbol: symbol,
      Price: price,
      Quantity: quantity
    })
    return this.http.post(`${API_URL}/executeSellTrade`,null, {headers});
  }

  addStocks(username: string, symbol: string){
    let headers = new HttpHeaders({
      Username: username,
      Stock: symbol
    })
    return this.http.post(`${API_URL}/addToWatchlist`,null, {headers});
  }

  getStockData(symbol: String){
    let currTime = Date.now();
    currTime = Math. trunc(currTime/1000);
    let startTime = currTime - 300000;
    return this.http.get<stockdata>(`https://priceapi.moneycontrol.com/globaltechCharts/usMarket/stock/history?symbol=${symbol}%3AUS&resolution=5&from=${startTime}&to=${currTime}&countback=300&currencyCode=USD`);
  }


}
