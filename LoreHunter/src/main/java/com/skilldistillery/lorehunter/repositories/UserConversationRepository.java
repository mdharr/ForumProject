package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserConversation;

public interface UserConversationRepository extends JpaRepository<UserConversation, Integer> {
	
	List<UserConversation> findAllByUserId(int userId);
	
	List<UserConversation> findByUser(User user);
	
    @Query("SELECT uc FROM UserConversation uc " +
            "JOIN uc.privateMessages pm " +
            "WHERE pm.sender = :sender AND pm.recipient = :recipient")
    UserConversation findByUsers(@Param("sender") User sender, @Param("recipient") User recipient);

}
