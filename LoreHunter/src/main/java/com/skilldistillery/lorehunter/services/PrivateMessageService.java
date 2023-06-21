package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.PrivateMessage;
import com.skilldistillery.lorehunter.entities.UserConversation;

public interface PrivateMessageService {
	
    PrivateMessage savePrivateMessage(PrivateMessage privateMessage);
    
    List<PrivateMessage> getPrivateMessagesByUserConversation(UserConversation userConversation);
    
	public List<PrivateMessage> getMessagesForUserConversation(int userConversationId);
    
    public List<PrivateMessage> getMessagesByUser(int userId);
    
    public List<PrivateMessage> getMessagesForUserConversationAndUser(int userConversationId, int userId);
    
    public PrivateMessage createMessage(PrivateMessage privateMessage);

}
