package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;
import com.skilldistillery.lorehunter.services.CategoryService;
import com.skilldistillery.lorehunter.services.CommentService;
import com.skilldistillery.lorehunter.services.PostService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class CommentController {
	
	@Autowired
	private PostService postService;
	
	@Autowired 
	private CategoryService categoryService;
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private CommentService commentService;
	
	@GetMapping("categories/{cid}/posts/{pid}/comments")
	public List<Comment> index(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("cid") int categoryId, @PathVariable("pid") int postId) {
		return commentService.index(categoryId);
	}

}
