package com.skilldistillery.lorehunter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
	
//	Set<Post> findByUser_Username(String username);
//	
//	Post findByIdAndUserId(int postId, int userId);
//	
//	List<Post> findByPost_Id(int id);

}
