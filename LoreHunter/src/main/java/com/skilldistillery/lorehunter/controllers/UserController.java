package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("users")
	public List<User> index() {
		return userService.index();
	}
	
	@GetMapping("users/{username}")
	public User show(Principal principal, @PathVariable String username, HttpServletResponse res) {
		User user = userService.showByUsername(username);
		if(user == null) {
			res.setStatus(404);
		}
		return user;
	}

}
