package com.trasim.trasim;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BalanceController {
	
	@Autowired
	private BalanceRepository balancerepo;
	
	@GetMapping("/getBalance")
    @ResponseBody
    public Balance getBalanceByUsername(@RequestParam("username") String username){
        return balancerepo.findByUsername(username);
    }

	@PostMapping("/addBalance")
    @ResponseBody
    public Balance addBalance(@RequestParam("username") String username,
    						  @RequestParam("balance") Double balance,
    						  @RequestParam("pnl") Double pnl){
		Balance newbalance = new Balance(username, balance, pnl);
        return balancerepo.save(newbalance);
    }
}
