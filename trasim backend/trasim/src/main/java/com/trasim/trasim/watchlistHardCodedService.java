package com.trasim.trasim;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class watchlistHardCodedService {
	
	private static List<Stock> stocks = new ArrayList();
	
	static {
		stocks.add(new Stock("CSCO", "Cisco Systems", 54.67));
		stocks.add(new Stock("TWLO", "Twilio", 68.21));
		stocks.add(new Stock("MSFT", "Microsoft", 126.65));
		stocks.add(new Stock("TATA", "Tata Ltd.", 554.45));
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
