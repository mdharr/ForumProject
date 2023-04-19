package com.skilldistillery.lorehunter.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
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
		userUpdate.setState(user.getState());
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
		userUpdate.setBannerImage(user.getBannerImage());
		userUpdate.setState(user.getState());
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
			Optional<User> userOpt = userRepo.findById(user.getId());
			if(userOpt.isPresent()) {
				User userUpdate = userOpt.get();
				userUpdate.setLastActivity(LocalDateTime.now());
				userRepo.saveAndFlush(userUpdate);
			}
	}

	@Override
	public User getUser(int userId) {
		User user = null;
		Optional<User> userOpt = userRepo.findById(userId);
		if (userOpt.isPresent()) {
			user = userOpt.get();
		}
		return user;
	}
	
	@Override
	public int getLoggedInUsersCount() {
	    int loggedInUsersCount = 0;
	    // Retrieve the list of all users from the repository
	    List<User> allUsers = userRepo.findAll();
	    // Iterate through the list and count the users who have the online status set to true
	    for (User user : allUsers) {
	        if (user.getIsOnline()) {
	            loggedInUsersCount++;
	        }
	    }
	    return loggedInUsersCount;
	}

	@Override
	public int getNotLoggedInUsersCount() {
	    int notLoggedInUsersCount = 0;
	    // Retrieve the list of all users from the repository
	    List<User> allUsers = userRepo.findAll();
	    // Iterate through the list and count the users who have the online status set to false
	    for (User user : allUsers) {
	        if (!user.getIsOnline()) {
	            notLoggedInUsersCount++;
	        }
	    }
	    return notLoggedInUsersCount;
	}






}
