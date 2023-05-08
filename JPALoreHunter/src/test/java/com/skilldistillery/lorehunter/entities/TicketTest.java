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

class TicketTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Ticket ticket;
	
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
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		ticket = null;
	}

	@Test
	void test_Ticket_entity_mapping() {
		assertNotNull(ticket);
		assertEquals("Idea for New Feature", ticket.getTitle());
	}
	
//	@Test
//	void test_Ticket_User_many_to_one_mapping() {
//		assertNotNull(ticket);
//		assertEquals("Resident Evil 4 |OT| Back in the Saddler", ticket.getTitle());
//	}

}
