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

class LikeTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Like like;

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
		like = em.find(Like.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		like = null;
	}

	@Test
	void test_Comment_Like_one_to_many_mapping() {
		assertNotNull(like);
		assertEquals("Wesker", like.getComment().getUser().getUsername());
	}
	
	@Test
	void test_User_Like_one_to_many_mapping() {
		assertNotNull(like);
		assertEquals("Snake", like.getUser().getUsername());
	}

}
