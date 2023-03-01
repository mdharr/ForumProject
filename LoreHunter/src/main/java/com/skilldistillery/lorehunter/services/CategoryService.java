package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.Category;

public interface CategoryService {
	
	public List<Category> index();
	
	public Category show();
	
	public Category create();
	
	public Category updateAdmin();
	
	public Category updateOwn();
	
	public void archive();

}
