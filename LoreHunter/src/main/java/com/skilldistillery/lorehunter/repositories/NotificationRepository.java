package com.skilldistillery.lorehunter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.entities.User;

public interface NotificationRepository extends JpaRepository<Notification, Integer>{
	
	Notification findById(int id);
		
    @Query("SELECT n FROM Notification n JOIN n.users u WHERE u = :user")
    List<Notification> findByUser(@Param("user") User user);

}
