package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.entities.User;
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
	
//	@GetMapping("users/{id}")
//	public User getUser(@PathVariable("id") int id, HttpServletResponse res) {
//		
//		if(userService.getUser(id) == null) {
//			res.setStatus(404);
//		}
//		return userService.getUser(id);
//	}
	
	@GetMapping("categories/{cid}")
	public Category find(@PathVariable("cid") int categoryId, HttpServletResponse res) {
		
		if(categoryService.getById(categoryId) == null) {
			res.setStatus(404);
		}
		return categoryService.getById(categoryId);
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
	
	@PutMapping("categories/{cid}")
	public Category update(Principal principal, @RequestBody Category category, @PathVariable("cid") int categoryId, HttpServletRequest req, HttpServletResponse res) {
		Category updateCategory = null;
		try {
			updateCategory = categoryService.update(principal.getName(), category, categoryId);
			if(updateCategory == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			category = null;
		}
		return updateCategory;
	}
	
	@PatchMapping("categories/{id}")
	public void archive(Principal principal, @PathVariable int id, HttpServletResponse res) {
		try {
			if (categoryService.archive(principal.getName(), id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
	
	@GetMapping("posts/{id}/category")
	public Integer getCategoryByPostId(@PathVariable("id") Integer postId) {
		return categoryService.getCategoryIdByPostId(postId);
	}

}
