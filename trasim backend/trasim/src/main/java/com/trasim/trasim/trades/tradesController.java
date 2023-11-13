package com.trasim.trasim.trades;

import java.util.ArrayList;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.trasim.trasim.Balance;
import com.trasim.trasim.BalanceRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class tradesController {

	@Autowired
	private tradesRespository tradesrepo;
	
	@Autowired
	private BalanceRepository balancerepo;
	
	
	@GetMapping("/getTrades/{username}")
    @ResponseBody
    public Trades getTradesByUsername(@PathVariable("username") String username){
        return tradesrepo.findByUsername(username);
    }
	
	@PostMapping("/executeBuyTrade")
    @ResponseBody
    public ResponseEntity<Void> executeBuyTrade(@RequestHeader(value="Username") String username,
    								@RequestHeader(value="Symbol") String symbol,
    								@RequestHeader(value="Price") Double price,
    								@RequestHeader(value="Quantity") Integer quantity){
		
		System.out.println("Yes");
		Trade trade = new Trade(symbol, price, quantity);
		Balance currBalance = balancerepo.findByUsername(username);
		if(currBalance.balance < trade.getPrice()*trade.getQuantity())
		{
			return ResponseEntity.notFound().build();
		}
		Trades currTrades = tradesrepo.findByUsername(username);
		if(currTrades == null) {
			ArrayList<Trade> trades = new ArrayList<Trade>();
			trades.add(trade);
			Trades newList = new Trades(username, trades);
			tradesrepo.save(newList);
			currBalance.setBalance(currBalance.getBalance() - trade.getPrice()*trade.getQuantity());
			balancerepo.deleteByUsername(username);
			balancerepo.save(currBalance);
			return ResponseEntity.noContent().build();
		}
		else {
			Boolean tradeFound = false;
			Iterator<Trade> iterator = currTrades.trades.iterator();
			while (iterator.hasNext()) {
				Trade currtrade = iterator.next();
				if(currtrade.symbol.equals(trade.symbol)) {
					Double newPrice = currtrade.getPrice()*currtrade.getQuantity()+trade.getPrice()*trade.getQuantity();
					Double newQuantity = newPrice/Double.valueOf(currtrade.getQuantity()+trade.getQuantity());
					currtrade.setPrice(newQuantity);
					currtrade.setQuantity(currtrade.getQuantity()+trade.getQuantity());
					tradeFound = true;
					break;
				}
			}
			if(tradeFound) {
				tradesrepo.deleteByUsername(username);
				tradesrepo.save(currTrades);
				currBalance.balance = currBalance.balance - trade.getPrice()*trade.getQuantity();
				balancerepo.deleteByUsername(username);
				balancerepo.save(currBalance);
				return ResponseEntity.noContent().build();
			}
			currTrades.trades.add(trade);
			tradesrepo.deleteByUsername(username);
			tradesrepo.save(currTrades);
			currBalance.balance = currBalance.balance - trade.getPrice()*trade.getQuantity();
			balancerepo.deleteByUsername(username);
			balancerepo.save(currBalance);
			return ResponseEntity.noContent().build();
		}
    }
	
	@PostMapping("/executeSellTrade")
    @ResponseBody
    public ResponseEntity<Void> executeSellTrade(@RequestHeader(value="Username") String username,
    								@RequestHeader(value="Symbol") String symbol,
    								@RequestHeader(value="Price") Double price,
    								@RequestHeader(value="Quantity") Integer quantity){
		Trade trade = new Trade(symbol, price, quantity);
		Trades currTrades = tradesrepo.findByUsername(username);
		if(currTrades == null) {
			return ResponseEntity.notFound().build();
		}
		else {
			Boolean tradeFound = false;
			Iterator<Trade> iterator = currTrades.trades.iterator();
			while (iterator.hasNext()) {
				Trade currtrade = iterator.next();
				if(currtrade.getSymbol().equals(trade.getSymbol())) {
					if(currtrade.getQuantity() < trade.getQuantity()) {
						return ResponseEntity.notFound().build();
					}
					else
					{
						currtrade.setQuantity(currtrade.getQuantity() - trade.getQuantity());
						tradeFound = true;
						break;
					}
				}
			}
			if(tradeFound)
			{
				tradesrepo.deleteByUsername(username);
				tradesrepo.save(currTrades);
				Balance currBalance = balancerepo.findByUsername(username);
				currBalance.setBalance(currBalance.getBalance()+trade.getQuantity()*trade.getPrice());
				balancerepo.deleteByUsername(username);
				balancerepo.save(currBalance);
				return ResponseEntity.noContent().build();
			}
			return ResponseEntity.notFound().build();
		}
	}
	
}
