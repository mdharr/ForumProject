package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.PrivateMessage;
import com.skilldistillery.lorehunter.entities.UserConversation;

public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Integer> {
	
	List<PrivateMessage> findByUserConversationIdOrderByCreatedAtAsc(int ticketId);
    
    List<PrivateMessage> findByUserIdOrderByCreatedAtAsc(int userId);
    
    List<PrivateMessage> findByUserConversationIdAndUserIdOrderByCreatedAtAsc(int ticketId, int userId);

}
