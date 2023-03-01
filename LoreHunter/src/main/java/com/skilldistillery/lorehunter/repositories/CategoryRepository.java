package com.skilldistillery.lorehunter.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	Category findByIdAndUserId(int categoryId, int userId);
	
	Set<Category> findByUser_Username(String username);

}
