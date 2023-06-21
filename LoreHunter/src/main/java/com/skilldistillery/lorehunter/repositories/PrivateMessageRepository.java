package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.PrivateMessage;
import com.skilldistillery.lorehunter.entities.UserConversation;

public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Integer> {
	
	List<PrivateMessage> findByUserConversationIdOrderByCreatedAtAsc(int userConversationid);
    
    List<PrivateMessage> findBySenderIdOrderByCreatedAtAsc(int userId);
    
    List<PrivateMessage> findByUserConversationIdAndSenderIdOrderByCreatedAtAsc(int userConversationId, int userId);
    
    List<PrivateMessage> findByUserConversationIdAndRecipientIdOrderByCreatedAtAsc(int userConversationId, int userId);
    
    List<PrivateMessage> findByUserConversation(UserConversation userConversation);

}
