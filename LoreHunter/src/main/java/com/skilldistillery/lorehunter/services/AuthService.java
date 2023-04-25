package com.skilldistillery.lorehunter.services;

import com.skilldistillery.lorehunter.entities.User;

public interface AuthService {
	
	public User register(User user);
	public User getUserByUsername(String username);
	public int getOnlineUsers();
	public int getLoggedInUsers();
	User authenticate(String username, String password);
	boolean isAdmin();

}
