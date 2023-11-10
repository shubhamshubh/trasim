package com.trasim.trasim.basic.auth;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AutheticationRepository extends MongoRepository<AuthtenticationBean, Long>{
	AuthtenticationBean findByUsername(String username);
}
