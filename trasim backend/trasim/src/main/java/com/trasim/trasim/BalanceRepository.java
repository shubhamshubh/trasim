package com.trasim.trasim;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BalanceRepository extends MongoRepository<Balance,Long>{
	Balance findByUsername(String username);
	Balance save(Balance balance);
}
