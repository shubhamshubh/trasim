package com.trasim.trasim.trades;

public class Trade {
	public String symbol;
	public Double price;
	public Integer quantity;
	
	public Trade(String symbol, Double price, Integer quantity) {
		super();
		this.symbol = symbol;
		this.price = price;
		this.quantity = quantity;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	
}
