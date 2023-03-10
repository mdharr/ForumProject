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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Post;
import com.skilldistillery.lorehunter.services.CommentService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@GetMapping("categories/{cid}/posts/{pid}/comments")
	public List<Comment> index(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("cid") int categoryId, @PathVariable("pid") int postId) {
		return commentService.index(postId, categoryId);
	}
	
	@PostMapping("categories/{cid}/posts/{pid}/comments")
	public Comment create(Principal principal, HttpServletRequest req, HttpServletResponse res, @PathVariable("cid") int categoryId, @PathVariable("pid") int postId, @RequestBody Comment comment) {
		
		try {
			commentService.create(principal.getName(), comment, postId);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(comment.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			comment = null;
		}
		
		return comment;
	}

}
