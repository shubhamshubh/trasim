import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stock } from 'src/app/watchlist/watchlist.component';
import { API_URL } from '../../app.consts';


@Injectable({
  providedIn: 'root'
})
export class WatchlistdataService {

  constructor(
    public http:HttpClient
  ) { }

  retriveWatchlist(name: String){
    return this.http.get<stock[]>(`${API_URL}/users/${name}/watchlist`);
  }

  deleteStocks(username: String, symbol: String){
    return this.http.delete(`${API_URL}/users/${username}/watchlist/${symbol}`);
  }
}
