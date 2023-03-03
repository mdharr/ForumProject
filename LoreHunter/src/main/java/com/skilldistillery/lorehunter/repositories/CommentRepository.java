package com.skilldistillery.lorehunter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
	Set<Comment> findByUser_Username(String username);
	
	Comment findByIdAndUserId(int commentId, int userId);
	
//	List<Comment> findByComment_Id(int id);
	
	List<Comment> findByPost_Id(int postId);

}
