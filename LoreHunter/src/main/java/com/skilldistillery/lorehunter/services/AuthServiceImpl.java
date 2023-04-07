package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.UserRepository;


@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private SessionRegistry sessionRegistry;


	@Override
	public User register(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		user.setEnabled(true);
		user.setRole("standard");
		userRepo.saveAndFlush(user);
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public int getOnlineUsers() {
	    List<Object> principals = sessionRegistry.getAllPrincipals();
	    return principals.size();
	}

	@Override
	public int getLoggedInUsers() {
	    List<Object> principals = sessionRegistry.getAllPrincipals();
	    System.out.println(principals);
	    return principals.size();
	}
	
	
	


}
