package com.skilldistillery.lorehunter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	Set<Category> findByUser_Username(String username);
	
	Category findByIdAndUserId(int categoryId, int userId);
	
	List<Category> findByCategory_Id(int id);

}
