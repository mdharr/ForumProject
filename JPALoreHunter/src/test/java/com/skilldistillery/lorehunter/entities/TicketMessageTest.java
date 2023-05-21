package com.skilldistillery.lorehunter.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TicketMessageTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Ticket ticket;
	private TicketMessage ticketMessage;
	private User user;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPALoreHunter");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		ticket = em.find(Ticket.class, 1);
		ticketMessage = em.find(TicketMessage.class, 1);
		user = em.find(User.class, 3);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		ticket = null;
		ticketMessage = null;
		user = null;
	}

	@Test
	void test_TicketMessage_entity_mapping() {
		assertNotNull(ticketMessage);
		assertEquals("Good morning Samus! We'd love to take care of that for you. Let me first verify that your last username change was not within the past year.", ticketMessage.getContent());
	}
	
	@Test
	void test_TicketMessage_User_many_to_one_mapping() {
		assertNotNull(ticketMessage);
		assertEquals("Snake", ticketMessage.getUser().getUsername());
		assertEquals(ticketMessage.getUser().getUsername(), user.getUsername());
	}
	
	@Test
	void test_TicketMessage_Ticket_many_to_one_mapping() {
		assertNotNull(ticketMessage);
		assertNotNull(ticket);
		assertEquals(ticket.getTitle(), ticketMessage.getTicket().getTitle());
	}

}
