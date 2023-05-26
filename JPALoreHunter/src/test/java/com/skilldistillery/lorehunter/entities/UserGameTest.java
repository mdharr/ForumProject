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

import com.skilldistillery.lorehunter.enums.GameCategory;
import com.skilldistillery.lorehunter.enums.GameRating;

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
		System.out.println(userGame);
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
	void test_UserGame_rating() {
		assertNotNull(userGame);
		assertEquals(GameRating.FIVE, userGame.getRating());
	}
	
	@Test
	void test_UserGame_category() {
		assertNotNull(userGame);
		assertEquals(GameCategory.PLAYED, userGame.getCategory());
	}
	
	@Test
	void test_User_Game_many_to_many_mapping_2() {
		assertNotNull(userGame);
		assertEquals("Jill", userGame.getGame().getUsers().get(0).getUsername());
	}

}
