package com.trasim.trasim.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class BasicAuthenticationController {
	
	@RequestMapping(method=RequestMethod.GET, path="/basicauth")
	public AuthtenticationBean helloWorldBean() {
		//throw new RuntimeException("Some Error Happened");
		return new AuthtenticationBean("You are Authenticated");
	}
	
}
