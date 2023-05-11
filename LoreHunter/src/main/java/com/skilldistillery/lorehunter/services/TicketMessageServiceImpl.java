package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.TicketMessage;
import com.skilldistillery.lorehunter.repositories.TicketMessageRepository;

@Service
public class TicketMessageServiceImpl implements TicketMessageService {
	
	@Autowired
	private TicketMessageRepository ticketMessageRepo;

	@Override
	public List<TicketMessage> getMessagesForTicket(int ticketId) {
        return ticketMessageRepo.findByTicketIdOrderByCreatedAtAsc(ticketId);
    }
	
	@Override
    public List<TicketMessage> getMessagesByUser(int userId) {
        return ticketMessageRepo.findByUserIdOrderByCreatedAtAsc(userId);
    }
	
	@Override
    public List<TicketMessage> getMessagesForTicketAndUser(int ticketId, int userId) {
        return ticketMessageRepo.findByTicketIdAndUserIdOrderByCreatedAtAsc(ticketId, userId);
    }
	
	@Override
    public TicketMessage createMessage(TicketMessage ticketMessage) {
        return ticketMessageRepo.save(ticketMessage);
    }

}
