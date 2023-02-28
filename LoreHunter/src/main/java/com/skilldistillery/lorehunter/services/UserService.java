package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.User;

public interface UserService {
	
	public List<User> index();
	
	public User show(int id);
	
	public User register(User user);
	
	public User updateAdmin(int id, User user);
	
	public User updateOwn(String username, User user);
	
	public boolean archiveUser(int id);
	
	public boolean deleteAdmin(int id);
	
	public User showByUsername(String username);
	
	public void updateLogInTime(User user);

}
