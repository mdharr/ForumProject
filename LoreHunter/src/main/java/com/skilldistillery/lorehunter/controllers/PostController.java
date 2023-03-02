package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Post;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;
import com.skilldistillery.lorehunter.services.CategoryService;
import com.skilldistillery.lorehunter.services.PostService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@Autowired 
	private CategoryService categoryService;
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@GetMapping("categories/{cid}/posts")
	public List<Post> index(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("cid") int categoryId) {
		return postService.index(categoryId);
	}
	
	@PostMapping("categories/{cid}/posts")
	public Post create(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("cid") int categoryId, @RequestBody Post post) {
		
		try {
			postService.create(principal.getName(), post, categoryId);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(post.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			post = null;
		}
		
		return post;
	}
	
	@PutMapping("categories/{cid}/posts/{pid}")
	public Post update(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("pid") int postId, @PathVariable("cid") int categoryId, @RequestBody Post post) {
		
		try {
			post = postService.update(principal.getName(), postId, post, categoryId);
			if(post == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			post = null;
		}
		
		return post;
	}

}
