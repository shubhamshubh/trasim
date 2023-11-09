package com.trasim.trasim;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class WatchListResource {
	
	
	@Autowired
	private watchlistHardCodedService watchlistService;
	
	@GetMapping("/users/{username}/watchlist")
	public List<Stock> getAllStocks(@PathVariable String username){
		System.out.println("Get Function called");
		return watchlistService.findAll();
	}
	
	@DeleteMapping("/users/{username}/watchlist/{symbol}")
	public ResponseEntity<Void> deleteWatchlist(@PathVariable String username, @PathVariable String symbol){
		System.out.println("Delete Function called");
		Stock stock = watchlistService.removeStock(symbol);
		System.out.println(stock.getSymbol());
		if(stock != null) {
			System.out.println(stock.getSymbol());
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("/users/{username}/watchlist")
	public ResponseEntity<Stock> addStock(
			@PathVariable String username,
			@RequestBody Stock stock){
		Stock stockAdded = watchlistService.addStock(stock);
		
		return new ResponseEntity<Stock>(stockAdded, HttpStatus.OK);
	}
		
}
