package com.trasim.trasim;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class HelloWorldController {
	
	
	
	@RequestMapping(method=RequestMethod.GET, path="/hello-world")
	public String helloWorld() {
		return "Hello World";
	}
	
	@RequestMapping(method=RequestMethod.GET, path="/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		//throw new RuntimeException("Some Error Happened");
		return new HelloWorldBean("Hello World Changed");
	}
	
	@GetMapping(path="/hello-world/{name}")
	public HelloWorldBean helloWorldName(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World %s", name));
	}
	
}
