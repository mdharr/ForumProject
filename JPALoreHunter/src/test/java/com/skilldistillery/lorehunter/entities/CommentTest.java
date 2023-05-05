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

class CommentTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Comment comment;

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
		comment = em.find(Comment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		comment = null;
	}

	@Test
	void test_Comment_entity_mapping() {
		assertNotNull(comment);
		assertEquals("Glad we are finally getting some solid gameplay footage.", comment.getContent());
	}
	
	@Test
	void test_Comment_Post_one_to_one_mapping() {
		assertNotNull(comment);
		assertEquals("Resident Evil 4 |OT| Back in the Saddler", comment.getPost().getSubject());
	}
	
	@Test
	void test_Comment_Category_one_to_one_mapping() {
		assertNotNull(comment);
		assertEquals("Gaming Forum", comment.getPost().getCategory().getName());
	}
	
	@Test
	void test_Comment_User_one_to_one_mapping() {
		assertNotNull(comment);
		assertEquals("Jill", comment.getUser().getUsername());
	}

}
