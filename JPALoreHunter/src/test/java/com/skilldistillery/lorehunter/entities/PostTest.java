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

class PostTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Post post;

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
		post = em.find(Post.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		post = null;
	}

	@Test
	void test_Post_entity_mapping() {
		assertNotNull(post);
		assertEquals("[Reddit Rumor] Embargo preview FFXVI lifted next week", post.getSubject());
	}
	
	@Test
	void test_Post_Category_one_to_one_mapping() {
		assertNotNull(post);
		assertEquals("Gaming Forum", post.getCategory().getName());
	}
	
	@Test
	void test_Post_User_one_to_one_mapping() {
		assertNotNull(post);
		assertEquals("Jill", post.getUser().getUsername());
	}
	
	@Test
	void test_Post_Comment_one_to_many_mapping() {
		assertNotNull(post);
		assertTrue(post.getComments().size() > 0);
	}
	
}
