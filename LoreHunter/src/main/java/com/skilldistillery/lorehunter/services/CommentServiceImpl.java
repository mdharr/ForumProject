package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Post;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;
import com.skilldistillery.lorehunter.repositories.CommentRepository;
import com.skilldistillery.lorehunter.repositories.PostRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private PostRepository postRepo;
	
	@Autowired
	private CommentRepository commentRepo;

	@Override
	public List<Comment> index(int postId) {
		return commentRepo.findByPost_Id(postId);
	}

	@Override
	public Set<Comment> indexByUsername(String username) {
		return commentRepo.findByUser_Username(username);
	}

	@Override
	public Comment show(String username, int commentId) {
		Comment comment = null;
		comment = commentRepo.findByIdAndUserId(commentId, userRepo.findByUsername(username).getId());
		return comment;
	}

	@Override
	public Comment create(String username, Comment comment, int postId) {
		User user = userRepo.findByUsername(username);
		Post post = null;
		Optional<Post> postOpt = postRepo.findById(postId);
		if(postOpt.isPresent()) {
			post = postOpt.get();
		}
		if(user != null) {
			comment.setUser(user);
			comment.setPost(post);
			return commentRepo.saveAndFlush(comment);
		}
		return null;
	}

	@Override
	public Comment update(String username, int commentId, Post post, int postId) {
		Comment existing = show(username, commentId);
		return commentRepo.save(existing);
	}

	@Override
	public boolean archive(String username, int commentId) {
		Optional<Comment> commentOpt = commentRepo.findById(commentId);
		if(commentOpt.isPresent()) {
			Comment comment = commentOpt.get();
			comment.setEnabled(false);
			commentRepo.saveAndFlush(comment);		
		}
		return true;
	}

}
