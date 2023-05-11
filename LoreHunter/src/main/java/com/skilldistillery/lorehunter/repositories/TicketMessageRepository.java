package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.TicketMessage;

public interface TicketMessageRepository extends JpaRepository<TicketMessage, Integer> {
	
	List<TicketMessage> findByTicketIdOrderByCreatedAtAsc(int ticketId);
    
    List<TicketMessage> findByUserIdOrderByCreatedAtAsc(int userId);
    
    List<TicketMessage> findByTicketIdAndUserIdOrderByCreatedAtAsc(int ticketId, int userId);

}
