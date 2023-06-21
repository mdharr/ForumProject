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

class PrivateMessageTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private UserConversation userConversation;
	private PrivateMessage privateMessage;
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
		userConversation = em.find(UserConversation.class, 1);
		privateMessage = em.find(PrivateMessage.class, 1);
		user = em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		userConversation = null;
		privateMessage = null;
		user = null;
	}

	@Test
	void test_PrivateMessage_entity_mapping() {
		assertNotNull(privateMessage);
		assertEquals("Hey, what's up?", privateMessage.getContent());
	}
	
	@Test
	void test_PrivateMessage_User_many_to_one_mapping() {
		assertNotNull(privateMessage);
		assertEquals("Jill", privateMessage.getSender().getUsername());
		assertEquals(privateMessage.getSender().getUsername(), user.getUsername());
		assertEquals("Wander", privateMessage.getRecipient().getUsername());
	}
	
	@Test
	void test_PrivateMessage_UserConversation_many_to_one_mapping() {
		assertNotNull(privateMessage);
		assertNotNull(userConversation);
		assertEquals(userConversation.getUser().getUsername(), user.getUsername());
	}

}
