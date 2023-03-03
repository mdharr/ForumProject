package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Set;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Post;

public interface CommentService {
	
	public List<Comment> index(int projectId);
	
	public Set<Comment> indexByUsername(String username);
	
	public Comment show(String username, int commentId);
	
	public Comment create(String username, Comment comment, int postId);
	
	public Comment update(String username, int commentId, Post post, int postId);
	
	public boolean archive(String username, int commentId);

}
