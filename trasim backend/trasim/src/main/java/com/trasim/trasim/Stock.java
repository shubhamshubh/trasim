package com.trasim.trasim;

import java.util.Objects;

public class Stock {
	public String symbol;
	public String company;
	
	
	public Stock(String symbol, String company) {
		super();
		this.symbol = symbol;
		this.company = company;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	@Override
	public int hashCode() {
		return Objects.hash(symbol);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Stock other = (Stock) obj;
		return Objects.equals(symbol, other.symbol);
	}
	
	
}
