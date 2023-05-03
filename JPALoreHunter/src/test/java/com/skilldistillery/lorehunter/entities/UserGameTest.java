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

class UserGameTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private UserGame userGame;

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
		userGame = em.find(UserGame.class, new UserGameId(1,1));
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		userGame = null;
	}

	@Test
	void test_User_Game_many_to_many_mapping() {
		assertNotNull(userGame);
		assertEquals(1, userGame.getUser().getId());
	}
	
	@Test
	void test_Game_User_many_to_many_mapping() {
		assertNotNull(userGame);
		assertEquals(1, userGame.getGame().getId());
	}
	
	@Test
	void test_User_Game_many_to_many_mapping_2() {
		assertNotNull(userGame);
		assertEquals("Jill", userGame.getGame().getUsers().get(0).getUsername());
	}

}
