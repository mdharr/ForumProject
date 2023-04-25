package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Integer>{
	
	Notification findById(int id);

}
