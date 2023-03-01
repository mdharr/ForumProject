package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired CategoryRepository categoryRepo;

	@Override
	public List<Category> index() {
		return categoryRepo.findAll();
	}

	@Override
	public Category show() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category create() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category updateAdmin() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Category updateOwn() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void archive() {
		// TODO Auto-generated method stub

	}

}
