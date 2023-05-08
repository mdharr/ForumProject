package com.skilldistillery.lorehunter.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.skilldistillery.lorehunter.repositories.TicketRepository;
import com.skilldistillery.lorehunter.services.TicketService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class TicketController {
	
	@Autowired
	private TicketService ticketService;
	
	@Autowired
	private TicketRepository ticketRepo;
	
	
	@GetMapping("tickets")
	public List<Ticket> listAllTickets() {
		return ticketService.getAllTickets();
	}

	@GetMapping("tickets/{id}")
	public ResponseEntity<Ticket> getTicketById(@PathVariable int id) {
		Optional<Ticket> optTicket = ticketRepo.findById(id);
		if (optTicket.isPresent()) {
			Ticket ticket = optTicket.get();
			return new ResponseEntity<>(ticket, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("tickets/users/{userId}")
	public List<Ticket> listTicketsByUserId(@PathVariable int userId) {
		return ticketService.getAllTicketsByUserId(userId);
	}

	@PostMapping("tickets")
	public ResponseEntity<Ticket> addTicket(@RequestBody Ticket ticket) {
		Ticket newTicket = ticketService.createTicket(ticket);
		if (newTicket == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
		}
	}

	@PutMapping("tickets/{id}")
	public ResponseEntity<Ticket> updateTicket(@PathVariable int id, @RequestBody Ticket ticket) {
		Ticket updatedTicket = ticketService.updateTicket(id, ticket);
		if (updatedTicket == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
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
