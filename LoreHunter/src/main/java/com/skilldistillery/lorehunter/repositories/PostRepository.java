package com.skilldistillery.lorehunter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
	
	Set<Post> findByUser_Username(String username);
	
	Post findByIdAndUserId(int postId, int userId);
	
	// This gives illegal argument exception because "Post" field does not exist in Post
//	List<Post> findByPost_Id(int postId);
	
	List<Post> findByCategory_Id(int categoryId);

}
