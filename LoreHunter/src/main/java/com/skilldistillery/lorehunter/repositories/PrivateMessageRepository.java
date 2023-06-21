package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.PrivateMessage;

public interface PrivateMessageRepository extends JpaRepository<PrivateMessage, Integer> {

}
