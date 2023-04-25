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

class UserNotificationTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private UserNotification userNotification;
	

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
		userNotification = em.find(UserNotification.class, new UserNotificationId(3,1));
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		userNotification = null;
		
	}

	@Test
	void test_User_Notification_many_to_many_mapping() {
		assertNotNull(userNotification);
		assertEquals(3, userNotification.getUser().getId());
	}
	
	@Test
	void test_Notification_User_many_to_many_mapping() {
		assertNotNull(userNotification);
		assertEquals(1, userNotification.getNotification().getId());
	}
	
	@Test
	void test_User_Notification_many_to_many_mapping_2() {
		assertNotNull(userNotification);
		assertEquals("Staff have decided to place a soft ban on topics concerning AI content generation and their algorithms like Stable Diffusion and ChatGPT. You can read more about the update here.", userNotification.getNotification().getMessage());
	}

}
