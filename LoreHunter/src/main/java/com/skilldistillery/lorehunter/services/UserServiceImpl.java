package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.UserRepository;

public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> index() {
		return userRepo.findAll();
	}

	@Override
	public User show(int id) {
		User user = null;
		Optional<User> userOpt = userRepo.findById(id);
		if(userOpt.isPresent()) {
			user = userOpt.get();
		}
		return user;
	}

	@Override
	public User register(User user) {
		user.setEnabled(true);
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User updateAdmin(int id, User user) {
		return null;
	}

	@Override
	public User updateOwn(String username, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean archiveUser(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteAdmin(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public User showByUsername(String username) {
		User user = null;
		User userOpt = userRepo.findByUsername(username);
		if(userOpt != null) {
			user = userOpt;
		}
		return user;
	}

	@Override
	public void updateLogInTime(User user) {
		// TODO Auto-generated method stub
		
	}

}
