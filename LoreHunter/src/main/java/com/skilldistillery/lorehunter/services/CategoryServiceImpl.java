package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired CategoryRepository categoryRepo;
	
	@Autowired UserRepository userRepo;

	@Override
	public List<Category> index() {
		return categoryRepo.findAll();
	}

	@Override
	public Category show(String username, int categoryId) {
		Category category = null;
		category = categoryRepo.findByIdAndUserId(categoryId, userRepo.findByUsername(username).getId());
		return category;
	}

	@Override
	public Category create(String username, Category category) {
		Category newCategory = null;
		User user = null;
		User userOpt = userRepo.findByUsername(username);
		if(userOpt != null) {
			user = userOpt;
			category.setUser(user);
			category.setEnabled(true);
			category.setStatus("active");
			newCategory = categoryRepo.saveAndFlush(category);
		}
		return newCategory;
	}

	@Override
	public Category update(String username, Category category, int categoryId) {

		Category existing = show(username, categoryId);
			existing.setName(category.getName());
			existing.setDescription(category.getDescription());
			existing.setStatus(category.getStatus());
			existing.setEnabled(category.getEnabled());
			existing.setCreatedAt(category.getCreatedAt());
			existing.setViewCount(category.getViewCount());
			existing.setPostCount(category.getPostCount());
			existing.setCommentCount(category.getCommentCount());
		return categoryRepo.save(existing);
	}

	@Override
	public boolean archive(String username, int categoryId) {
		Optional<Category> categoryOpt = categoryRepo.findById(categoryId);
		if(categoryOpt.isPresent()) {
			Category category = categoryOpt.get();
			category.setEnabled(false);
			categoryRepo.saveAndFlush(category);		
		}
		return true;
	}



	@Override
	public Category getById(int categoryId) {
		Category category = null;
		Optional<Category> categoryOpt = categoryRepo.findById(categoryId);
		if(categoryOpt.isPresent()) {
			category = categoryOpt.get();
		}
		return category;
	}

}
