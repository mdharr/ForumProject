package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.enums.VerifiedStatus;
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
		user.setVerificationCode("1287ce4e-93c9-439c-9673-d166bb948482");
		user.setVerifiedStatus(VerifiedStatus.ACTIVE);
		user.setResendCount(0);
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
	
	@Override
	public User authenticate(String username, String password) {
	    // Find the user by username
	    User user = userRepo.findByUsername(username);

	    // If user not found, return null
	    if (user == null) {
	        return null;
	    }

	    // Validate the password
	    if (!validatePassword(password, user.getPassword())) {
	        return null;
	    }

	    // Return the authenticated user
	    return user;
	}

	private boolean validatePassword(String password, String hashedPassword) {
	    // Implement your password validation logic here
	    // For example, you can use a library like BCryptPasswordEncoder for password hashing
	    // and comparison, or any other custom logic based on your application's requirements
	    // Here's an example using BCryptPasswordEncoder:

	    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	    return encoder.matches(password, hashedPassword);
	}
	
	
	


}
