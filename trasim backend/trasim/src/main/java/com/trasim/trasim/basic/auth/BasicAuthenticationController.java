package com.trasim.trasim.basic.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class BasicAuthenticationController {
	
	@Autowired
	private AutheticationRepository authenticationrepo;
	
	@RequestMapping(method=RequestMethod.GET, path="/basicauth")
	public ResponseEntity<Void> AuthenticateUser(@RequestHeader(value="Username") String username, 
			                                  @RequestHeader(value="Authorization") String password) {
		//throw new RuntimeException("Some Error Happened");
		System.out.println(username);
		System.out.println(password);
		AuthtenticationBean exsistingUser = authenticationrepo.findByUsername(username);
		if(exsistingUser == null || !exsistingUser.getPassword().equals(password))
			return ResponseEntity.notFound().build();
		
		System.out.println(username);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method=RequestMethod.POST, path="/basicauth")
	public ResponseEntity<Void> AddNewUser(@RequestHeader(value="Username") String username, 
			                                  @RequestHeader(value="Authorization") String password) {
		//throw new RuntimeException("Some Error Happened");
		AuthtenticationBean exsistingUser = authenticationrepo.findByUsername(username);
		if(exsistingUser == null) {
			AuthtenticationBean newUser = new AuthtenticationBean(username, password);
			authenticationrepo.save(newUser);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
}
