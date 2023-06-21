package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.PrivateMessage;
import com.skilldistillery.lorehunter.entities.TicketMessage;
import com.skilldistillery.lorehunter.entities.UserConversation;
import com.skilldistillery.lorehunter.repositories.PrivateMessageRepository;

@Service
public class PrivateMessageServiceImpl implements PrivateMessageService {
	
	@Autowired
	private PrivateMessageRepository privateMessageRepo;

	@Override
	public PrivateMessage savePrivateMessage(PrivateMessage privateMessage) {
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
		return privateMessageRepo.findByUserIdOrderByCreatedAtAsc(userId);
	}

	@Override
	public List<PrivateMessage> getMessagesForUserConversationAndUser(int userConversationId, int userId) {
		return privateMessageRepo.findByUserConversationIdAndUserIdOrderByCreatedAtAsc(userConversationId, userId);
	}

	@Override
	public PrivateMessage createMessage(PrivateMessage privateMessage) {
		return privateMessageRepo.save(privateMessage);
	}

}
