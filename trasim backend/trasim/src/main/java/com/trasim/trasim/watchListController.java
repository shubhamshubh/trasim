package com.trasim.trasim;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class watchListController {
	
	@Autowired
	private watchlistRepository watchlistrepo;
	
	@GetMapping("/watchlist/{username}")
    @ResponseBody
    public List<String> getWatchlistByUsername(@PathVariable("username") String username){
        return watchlistrepo.findByUsername(username).stocks;
    }

	@PostMapping("/addToWatchlist")
    @ResponseBody
    public watchList addToWatchlist(@RequestHeader(value="Username") String username,
    								@RequestHeader(value="Stock") String stock){
		
		System.out.println("Yes");
		watchList currList = watchlistrepo.findByUsername(username);
		if(currList == null) {
			List<String> stocks = new ArrayList<String>();
			stocks.add(stock);
			watchList newList = new watchList(username, stocks);
			watchlistrepo.save(newList);
		}
		else {
			List<String> stocks = currList.getStocks();
			stocks.add(stock);
			watchList newList = new watchList(username, stocks);
			watchlistrepo.deleteByUsername(username);
			watchlistrepo.save(newList);
		}
		return null;
    }
	
	@PutMapping("/deletFromWatchlist")
    @ResponseBody
    public watchList deleteFromWatchlist(@RequestHeader(value="Username") String username,
    								@RequestHeader(value="Stock") String stock){
		
		System.out.println("Yes");
		watchList currList = watchlistrepo.findByUsername(username);
		List<String> stocks = currList.getStocks();
		stocks.remove(stock);
		watchList newList = new watchList(username, stocks);
		watchlistrepo.deleteByUsername(username);
		watchlistrepo.save(newList);
		return null;
    }

}
