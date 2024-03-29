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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Ticket;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.TicketRepository;
import com.skilldistillery.lorehunter.services.TicketService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class TicketController {
	
	@Autowired
	private TicketService ticketService;
	
	@Autowired
	private TicketRepository ticketRepo;
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("tickets")
	public ResponseEntity<List<Ticket>> listAllTickets(Principal principal) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    User authenticatedUser = userService.showByUsername(username);
	    if (authenticatedUser.getRole().equals("ADMIN")) {
	        return new ResponseEntity<>(ticketService.getAllTickets(), HttpStatus.OK);
	    }
	    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}


	@GetMapping("tickets/{id}")
	public ResponseEntity<Ticket> getTicketById(@PathVariable int id, Principal principal) {
		Optional<Ticket> optTicket = ticketRepo.findById(id);
		if (optTicket.isPresent()) {
			Ticket ticket = optTicket.get();
			
			// Example of how to check user information from principal
		    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		    String username = authentication.getName();
		    User authenticatedUser = userService.showByUsername(username);
			if (!authenticatedUser.getRole().equals("ADMIN")) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			
			return new ResponseEntity<>(ticket, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("users/{userId}/tickets")
	public ResponseEntity<List<Ticket>> listTicketsByUserId(@PathVariable int userId, Principal principal) {
		// Example of how to check user information from principal
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    User authenticatedUser = userService.showByUsername(username);
		if (userId != authenticatedUser.getId() && !authenticatedUser.getRole().equals("ADMIN")) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} else if (userId == authenticatedUser.getId() || authenticatedUser.getRole().equals("ADMIN")) {
			return new ResponseEntity<>(ticketService.getAllTicketsByUserId(userId), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}

	@PostMapping("tickets")
	public ResponseEntity<Ticket> addTicket(@RequestBody Ticket ticket, Principal principal) {
		
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    User authenticatedUser = userService.showByUsername(username);
	    
		ticket.setUser(authenticatedUser);
		
		Ticket newTicket = ticketService.createTicket(ticket);
		if (newTicket == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
		}
	}
	
	@PutMapping("users/{uid}/tickets/{tid}")
	public ResponseEntity<Ticket> updateUserTicket(@PathVariable("uid") int userId, @PathVariable("tid") int ticketId, @RequestBody Ticket ticket, Principal principal) {
		Optional<Ticket> optTicket = ticketRepo.findById(ticketId);
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    User authenticatedUser = userService.showByUsername(username);
		if (optTicket.isPresent()) {
			Ticket existingTicket = optTicket.get();
			
			// Example of how to check user information from principal
			if (!(authenticatedUser.getId() == existingTicket.getUser().getId())) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			
			existingTicket.setTitle(ticket.getTitle());
			existingTicket.setDescription(ticket.getDescription());
			
			Ticket updatedTicket = ticketService.updateTicket(ticketId, existingTicket);
			
			if (updatedTicket == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("tickets/{id}")
	public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody Ticket ticket, Principal principal) {
		Optional<Ticket> optTicket = ticketRepo.findById(id);
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    User authenticatedUser = userService.showByUsername(username);
		if (optTicket.isPresent()) {
			Ticket existingTicket = optTicket.get();
			
			// Example of how to check user information from principal
			if (!authenticatedUser.getRole().equals("ADMIN")) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			
			if (ticket.getTitle() != null) {
				existingTicket.setTitle(ticket.getTitle());
			}
			
			if (ticket.getDescription() != null) {
				existingTicket.setDescription(ticket.getDescription());
			}
			
			if (ticket.getPriority() != null) {
				existingTicket.setPriority(ticket.getPriority());
			}
			
			if (ticket.getStatus() != null) {
				existingTicket.setStatus(ticket.getStatus());
			}
			
			Ticket updatedTicket = ticketService.updateTicket(id, existingTicket);
			
			if (updatedTicket == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("tickets/{id}")
	public ResponseEntity<Ticket> deleteTicket(@PathVariable int id) {
		Optional<Ticket> optTicket = ticketRepo.findById(id);
		if (optTicket.isPresent()) {
			Ticket ticket = optTicket.get();
			ticketRepo.deleteById(ticket.getId());
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
