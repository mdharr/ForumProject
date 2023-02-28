package com.skilldistillery.lorehunter.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CategoryTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Category category;

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
		category = em.find(Category.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		category = null;
	}

	@Test
	void test_Category_entity_mapping() {
		assertNotNull(category);
		assertEquals("Gaming Forum", category.getName());
	}
	
	@Test
	void test_Category_Post_one_to_many_mapping() {
		assertNotNull(category);
		assertTrue(category.getPosts().size() > 0);
	}
	
	@Test
	void test_Category_User_one_to_one_mapping() {
		assertNotNull(category);
		assertEquals("admin", category.getUser().getUsername());
	}
	
	@Test
	void test_Category_Comment_one_to_many_mapping() {
		assertNotNull(category);
		assertEquals("Glad we are finally getting some solid gameplay footage.", category.getPosts().get(0).getComments().get(0).getContent());
	}

}
