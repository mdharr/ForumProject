package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.UserConversation;

public interface UserConversationRepository extends JpaRepository<UserConversation, Integer> {

}
