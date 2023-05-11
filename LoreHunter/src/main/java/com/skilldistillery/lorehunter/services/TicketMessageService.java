package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.TicketMessage;

public interface TicketMessageService {
	
	public List<TicketMessage> getMessagesForTicket(int ticketId);
    
    public List<TicketMessage> getMessagesByUser(int userId);
    
    public List<TicketMessage> getMessagesForTicketAndUser(int ticketId, int userId);
    
    public TicketMessage createMessage(TicketMessage ticketMessage);

}
