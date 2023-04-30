package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Like;
import com.skilldistillery.lorehunter.entities.User;

public interface LikeRepository extends JpaRepository<Like, Integer> {
	
    @Query("SELECT COUNT(l) FROM Like l WHERE l.comment = :comment")
    int countByComment(@Param("comment") Comment comment);

    boolean existsByUserAndComment(User user, Comment comment);

}
