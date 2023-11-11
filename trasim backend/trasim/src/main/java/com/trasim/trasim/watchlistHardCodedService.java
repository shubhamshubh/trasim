package com.trasim.trasim;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class watchlistHardCodedService {
	
	private static List<Stock> stocks = new ArrayList<Stock>();
	
	static {
		stocks.add(new Stock("CSCO", "Cisco Systems"));
		stocks.add(new Stock("TWLO", "Twilio"));
		stocks.add(new Stock("MSFT", "Microsoft"));
		stocks.add(new Stock("TATA", "Tata Ltd."));
	}
	
	public List<Stock> findAll(){
		return stocks;
	}
	
	public Stock removeStock(String symbol) {
		Stock stock = findBysymbol(symbol);
		if(stock==null)
			return null;
		stocks.remove(stock);
		return stock;
	}

	public Stock findBysymbol(String symbol) {
		for(Stock stock:stocks) {
			System.out.println(stock.getSymbol());
			if(stock.getSymbol().equals(symbol))
			{
				return stock;
			}
		}
		return null;
	}
	
	public Stock addStock(Stock stock) {
		Stock oldStock = findBysymbol(stock.getSymbol());
		if(oldStock == null) {
			stocks.add(stock);
			return stock;
		}
		else
			return oldStock;
	}
	
}
