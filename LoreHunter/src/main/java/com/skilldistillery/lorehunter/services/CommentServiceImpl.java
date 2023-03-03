package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public List<Comment> index(int projectId) {
		return commentRepo.findByProject_Id(projectId);
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
	public Comment create(String username, Comment comment, int postId, int categoryId) {
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
	public Comment update(String username, int commentId, Post post, int postId, int categoryId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean archive(String username, int commentId, int postId, int categoryId) {
		// TODO Auto-generated method stub
		return false;
	}

}
