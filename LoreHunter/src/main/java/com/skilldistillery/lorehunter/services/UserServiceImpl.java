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
		User userUpdate = show(id);
		userUpdate.setUsername(user.getUsername());
		userUpdate.setPassword(user.getPassword());
		userUpdate.setEnabled(user.getEnabled());
		userUpdate.setRole(user.getRole());
		userUpdate.setFirstName(user.getFirstName());
		userUpdate.setLastName(user.getLastName());
		userUpdate.setEmail(user.getEmail());
		userUpdate.setImageUrl(user.getImageUrl());
		userUpdate.setStatus(user.getStatus());
		userUpdate.setBannerMessage(user.getBannerMessage());
		return userRepo.save(userUpdate);
	}

	@Override
	public User updateOwn(String username, User user) {
		User userUpdate = userRepo.findByUsername(username);
		userUpdate.setUsername(user.getUsername());
		userUpdate.setPassword(user.getPassword());
		userUpdate.setFirstName(user.getFirstName());
		userUpdate.setLastName(user.getLastName());
		userUpdate.setEmail(user.getEmail());
		userUpdate.setImageUrl(user.getImageUrl());
		userUpdate.setBannerMessage(user.getBannerMessage());
		return userRepo.save(userUpdate);
	}

	@Override
	public boolean archiveUser(int id) {
		Optional<User> userOpt = userRepo.findById(id);
		if(userOpt.isPresent()) {
			User user = userOpt.get();
			user.setEnabled(false);
			userRepo.saveAndFlush(user);		
		}
		return true;
	}

	@Override
	public boolean deleteAdmin(int id) {
		userRepo.deleteById(id);
		return !userRepo.existsById(id);
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
