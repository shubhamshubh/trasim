package com.trasim.trasim.trades;

import java.util.ArrayList;

public class Trades {
	
	public String username;
	public ArrayList<Trade> trades;
	
	public Trades(String username, ArrayList<Trade> trades) {
		super();
		this.username = username;
		this.trades = trades;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public ArrayList<Trade> getTrades() {
		return trades;
	}
	public void setTrades(ArrayList<Trade> trades) {
		this.trades = trades;
	}
	
	

}
