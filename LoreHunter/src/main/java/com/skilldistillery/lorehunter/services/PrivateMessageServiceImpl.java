package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.PrivateMessage;
import com.skilldistillery.lorehunter.entities.TicketMessage;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserConversation;
import com.skilldistillery.lorehunter.repositories.PrivateMessageRepository;
import com.skilldistillery.lorehunter.repositories.UserConversationRepository;

@Service
public class PrivateMessageServiceImpl implements PrivateMessageService {
	
	@Autowired
	private PrivateMessageRepository privateMessageRepo;
	
	@Autowired
	private UserConversationRepository userConversationRepo;

//	@Override
//	public PrivateMessage savePrivateMessage(PrivateMessage privateMessage) {
//		return privateMessageRepo.save(privateMessage);
//	}
	
	@Override
	public PrivateMessage savePrivateMessage(PrivateMessage privateMessage) {
	    User sender = privateMessage.getSender();
	    User recipient = privateMessage.getRecipient();
	    UserConversation conversation = privateMessage.getUserConversation();

	    // Check if a conversation exists
	    if (conversation == null) {
	        // Look for an existing conversation between the sender and recipient
	        conversation = userConversationRepo.findByUsers(sender, recipient);

	        // If no conversation found, create a new one
	        if (conversation == null) {
	            conversation = new UserConversation();
	            conversation.setUser(sender);
	            conversation = userConversationRepo.save(conversation);
	        }

	        privateMessage.setUserConversation(conversation);
	    }

	    return privateMessageRepo.save(privateMessage);
	}

	@Override
	public List<PrivateMessage> getPrivateMessagesByUserConversation(UserConversation userConversation) {
        return privateMessageRepo.findByUserConversation(userConversation);
	}

	@Override
	public List<PrivateMessage> getMessagesForUserConversation(int userConversationId) {
		return privateMessageRepo.findByUserConversationIdOrderByCreatedAtAsc(userConversationId);
	}

	@Override
	public List<PrivateMessage> getMessagesByUser(int userId) {
		return privateMessageRepo.findBySenderIdOrderByCreatedAtAsc(userId);
	}

	@Override
	public List<PrivateMessage> getMessagesForUserConversationAndUser(int userConversationId, int userId) {
		return privateMessageRepo.findByUserConversationIdAndSenderIdOrderByCreatedAtAsc(userConversationId, userId);
	}

	@Override
	public PrivateMessage createMessage(PrivateMessage privateMessage) {
		return privateMessageRepo.save(privateMessage);
	}

}
