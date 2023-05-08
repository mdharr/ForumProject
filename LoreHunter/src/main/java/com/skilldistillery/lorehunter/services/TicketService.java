package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.Ticket;

public interface TicketService {
	
	List<Ticket> getAllTickets();

	List<Ticket> getAllTicketsByUserId(int userId);

	Ticket createTicket(Ticket ticket);
	
    Ticket updateTicket(int id, Ticket ticket);


}
