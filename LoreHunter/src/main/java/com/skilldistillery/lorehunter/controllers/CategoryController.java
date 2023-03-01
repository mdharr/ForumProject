package com.skilldistillery.lorehunter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.services.CategoryService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class CategoryController {
	
	@Autowired CategoryService categoryService;
	
	@GetMapping("categories")
	public List<Category> index() {
		return categoryService.index();
	}

}
