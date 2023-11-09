import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stock } from 'src/app/watchlist/watchlist.component';


@Injectable({
  providedIn: 'root'
})
export class WatchlistdataService {

  constructor(
    public http:HttpClient
  ) { }

  retriveWatchlist(name: String){
    return this.http.get<stock[]>(`http://localhost:8080/users/${name}/watchlist`);
  }

  deleteStocks(username: String, symbol: String){
    return this.http.delete(`http://localhost:8080/users/${username}/watchlist/${symbol}`);
  }
}
