package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserConversation;
import com.skilldistillery.lorehunter.repositories.UserConversationRepository;

@Service
public class UserConversationServiceImpl implements UserConversationService {
	
	@Autowired
	private UserConversationRepository userConversationRepo;

	@Override
	public UserConversation saveUserConversation(UserConversation userConversation) {
        return userConversationRepo.save(userConversation);
	}

	@Override
	public List<UserConversation> getUserConversationsByUser(User user) {
        return userConversationRepo.findByUser(user);
	}

	@Override
	public List<UserConversation> getAllUserConversations() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<UserConversation> getAllUserConversationsByUserId(int userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserConversation createUserConversation(UserConversation userConversation) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserConversation updateUserConversation(int id, UserConversation userConversation) {
		// TODO Auto-generated method stub
		return null;
	}

}
