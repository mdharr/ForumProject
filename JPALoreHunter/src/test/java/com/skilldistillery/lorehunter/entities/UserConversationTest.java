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

class UserConversationTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private UserConversation userConversation;

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
		userConversation = em.find(UserConversation.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		userConversation = null;
	}

	@Test
	void test_UserConversation_entity_mapping() {
		assertNotNull(userConversation);
		assertEquals("Jill", userConversation.getUser().getUsername());
	}

}
