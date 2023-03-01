package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;
import com.skilldistillery.lorehunter.services.CategoryService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class CategoryController {
	
	@Autowired 
	CategoryService categoryService;
	
	@Autowired
	CategoryRepository categoryRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	UserService userService;
	
	@GetMapping("categories")
	public List<Category> index() {
		return categoryService.index();
	}
	
	@PostMapping("categories")
	public Category createCategory(Principal principal, @RequestBody Category category, HttpServletResponse res, HttpServletRequest req) {
		Category newCategory = null;
		try {
			newCategory = categoryService.create(principal.getName(), category);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(404);
		}
		return newCategory;
	}

}
