package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.entities.Post;
import com.skilldistillery.lorehunter.entities.Ticket;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.TicketRepository;

@Service
public class TicketServiceImpl implements TicketService {
	
	@Autowired
	private TicketRepository ticketRepo;

	@Override
	public List<Ticket> getAllTickets() {
		return ticketRepo.findAll();
	}
	
    @Override
    public List<Ticket> getAllTicketsByUserId(int userId) {
        return ticketRepo.findAllByUserId(userId);
    }

    @Override
    public Ticket createTicket(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    @Override
    public Ticket updateTicket(int id, Ticket ticket) {
        Optional<Ticket> optionalTicket = ticketRepo.findById(id);
        if (optionalTicket.isPresent()) {
            Ticket existingTicket = optionalTicket.get();
            existingTicket.setTitle(ticket.getTitle());
            existingTicket.setDescription(ticket.getDescription());
            existingTicket.setPriority(ticket.getPriority());
            existingTicket.setStatus(ticket.getStatus());
            return ticketRepo.save(existingTicket);
        } 
        return null;
    }


}
