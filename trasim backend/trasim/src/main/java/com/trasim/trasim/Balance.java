package com.trasim.trasim;

public class Balance {
	public String username;
	public Double balance;
	public Double pnl;
	
	public Balance(String username, Double balance, Double pnl) {
		super();
		this.username = username;
		this.balance = balance;
		this.pnl = pnl;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public Double getPnl() {
		return pnl;
	}
	public void setPnl(Double pnl) {
		this.pnl = pnl;
	}
	
	
}
