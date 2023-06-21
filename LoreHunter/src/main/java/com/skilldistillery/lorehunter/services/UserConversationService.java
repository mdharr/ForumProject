package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserConversation;

public interface UserConversationService {
	
    UserConversation saveUserConversation(UserConversation userConversation);
    
    List<UserConversation> getUserConversationsByUser(User user);
    
	List<UserConversation> getAllUserConversations();

	List<UserConversation> getAllUserConversationsByUserId(int userId);

	UserConversation createUserConversation(UserConversation userConversation);
	
    UserConversation updateUserConversation(int id, UserConversation userConversation);

}
