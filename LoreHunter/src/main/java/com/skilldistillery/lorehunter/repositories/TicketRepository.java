package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
