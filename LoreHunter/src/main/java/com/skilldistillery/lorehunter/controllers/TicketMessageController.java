package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Ticket;
import com.skilldistillery.lorehunter.entities.TicketMessage;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.TicketRepository;
import com.skilldistillery.lorehunter.services.TicketMessageService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class TicketMessageController {
	
	@Autowired
	private TicketMessageService ticketMessageService;
	
	@Autowired
	private TicketRepository ticketRepo;
	
	@Autowired
	private UserService userService;
	
    @GetMapping("tickets/{tid}/messages")
    public ResponseEntity<List<TicketMessage>> getMessagesForTicket(@PathVariable("tid") int ticketId, Principal principal) {
    	Optional<Ticket> optTicket = ticketRepo.findById(ticketId);
    	if (optTicket.isPresent()) {
    		Ticket ticket = optTicket.get();
    		List<TicketMessage> ticketMessages = ticket.getTicketMessages();
    		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    		String username = authentication.getName();
    		User authenticatedUser = userService.showByUsername(username);
    		if (!authenticatedUser.getRole().equals("ADMIN")) {
    			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    		}
    		
    		return new ResponseEntity<>(ticketMessages, HttpStatus.OK);
    	}
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
    @GetMapping("users/{uid}/tickets/{tid}/messages")
    public ResponseEntity<List<TicketMessage>> getMessagesForTicketAndUser(@PathVariable("tid") int ticketId, @PathVariable("uid") int userId, Principal principal) {
    	Optional<Ticket> optTicket = ticketRepo.findById(ticketId);
    	if (optTicket.isPresent()) {
    		Ticket ticket = optTicket.get();
    		List<TicketMessage> ticketMessages = ticket.getTicketMessages();
    		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    		String username = authentication.getName();
    		User authenticatedUser = userService.showByUsername(username);
    		if (authenticatedUser.getId() != userId) {
    			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    		}
    		return new ResponseEntity<>(ticketMessages, HttpStatus.OK);
    	}
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("tickets/{tid}/messages")
    public ResponseEntity<TicketMessage> createMessage(@RequestBody TicketMessage ticketMessage, @PathVariable("tid") int ticketId, Principal principal) {
    	Optional<Ticket> optTicket = ticketRepo.findById(ticketId);
    	if (optTicket.isPresent()) {
    		Ticket ticket = optTicket.get();
    		List<TicketMessage> ticketMessages = ticket.getTicketMessages();
    		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    		String username = authentication.getName();
    		User authenticatedUser = userService.showByUsername(username);
    		if(!authenticatedUser.getRole().equals("ADMIN") && authenticatedUser.getId() != ticket.getUser().getId()) {
    			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    		}
    		ticketMessage.setUser(authenticatedUser);
    		ticketMessage.setTicket(ticket);
    		TicketMessage newTicketMessage = ticketMessageService.createMessage(ticketMessage);
    		if (newTicketMessage == null) {
    			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    		} else {
    			ticketMessages.add(newTicketMessage);
    			return new ResponseEntity<>(ticketMessage, HttpStatus.CREATED);
    		}
    	} else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}

    }

}
