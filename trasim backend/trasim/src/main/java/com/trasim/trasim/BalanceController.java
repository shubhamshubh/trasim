package com.trasim.trasim;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins="http://localhost:4200")
@RestController
public class BalanceController {
	
	@Autowired
	private BalanceRepository balancerepo;
	
	@GetMapping("/getBalance/{username}")
    @ResponseBody
    public Balance getBalanceByUsername(@PathVariable("username") String username){
        return balancerepo.findByUsername(username);
    }

	@PostMapping("/addBalance")
    @ResponseBody
    public Balance addBalance(@RequestHeader(value="Username") String username){
		Balance newbalance = new Balance(username, 10000.0, 0.0);
        return balancerepo.save(newbalance);
    }
}
