package com.skilldistillery.lorehunter.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.entities.Post;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.repositories.CategoryRepository;
import com.skilldistillery.lorehunter.repositories.PostRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private PostRepository postRepo;
	
	@Override
	public List<Post> index(int categoryId) {
		return postRepo.findByCategory_Id(categoryId);
	}

	@Override
	public Set<Post> indexByUsername(String username) {
		return postRepo.findByUser_Username(username);
	}

	@Override
	public Post show(String username, int postId) {
		Post post = null;
		post = postRepo.findByIdAndUserId(postId, userRepo.findByUsername(username).getId());
		return post;
	}

	@Override
	public Post create(String username, Post post, int categoryId) {
		User user = userRepo.findByUsername(username);
		Category category = null;
		Optional<Category> categoryOpt = categoryRepo.findById(categoryId);
		if (categoryOpt.isPresent()) {
			category = categoryOpt.get();
		}
		if (user != null) {
			post.setUser(user);
			post.setCategory(category);
			return postRepo.saveAndFlush(post);
		}
		return null;
	}

	@Override
	public Post update(String username, int postId, Post post, int categoryId) {
		Post existing = show(username, postId);
		existing.setSubject(post.getSubject());
		existing.setContent(post.getContent());
		existing.setStatus(post.getStatus());
		return postRepo.save(existing);
	}

	@Override
	public boolean archive(String username, int postId, int categoryId) {
		Optional<Post> postOpt = postRepo.findById(postId);
		if(postOpt.isPresent()) {
			Post post = postOpt.get();
			post.setEnabled(false);
			postRepo.saveAndFlush(post);		
		}
		return true;
	}

}
