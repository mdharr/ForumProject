package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserConversation;

public interface UserConversationRepository extends JpaRepository<UserConversation, Integer> {
	
	List<UserConversation> findAllByUserId(int userId);
	
	List<UserConversation> findByUser(User user);

}
