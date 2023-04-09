package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.Category;

public interface CategoryService {
	
	public List<Category> index();
	
	public Category show(String username, int categoryId);
	
	public Category create(String username, Category category);
	
	public Category update(String username, Category category, int categoryId);
	
	public boolean archive(String username, int categoryId);
	
	public Category getById(int categoryId);
	
	public Integer getCategoryIdByPostId(Integer postId);

}
