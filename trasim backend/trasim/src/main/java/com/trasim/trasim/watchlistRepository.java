package com.trasim.trasim;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface watchlistRepository extends MongoRepository<watchList, Long>{
	watchList findByUsername(String username);
	void deleteByUsername(String username);
}
