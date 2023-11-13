package com.trasim.trasim.trades;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface tradesRespository extends MongoRepository<Trades, Long>{
	
	Trades findByUsername(String username);
	void deleteByUsername(String username);
	
}
