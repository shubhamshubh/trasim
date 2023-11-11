package com.trasim.trasim;

import java.util.List;

public class watchList {
	
	public String username;
	public List<String> stocks;
	
	public watchList(String username, List<String> stocks) {
		super();
		this.username = username;
		this.stocks = stocks;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<String> getStocks() {
		return stocks;
	}
	public void setStocks(List<String> stocks) {
		this.stocks = stocks;
	}
	
	

}
