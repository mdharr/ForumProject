package com.skilldistillery.lorehunter.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserNotification;
import com.skilldistillery.lorehunter.entities.UserNotificationId;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Integer>{
	
	UserNotification findByUserAndNotification(User user, Notification notification);
	
	@Query("SELECT u FROM UserNotification u WHERE u.id = :userNotificationId")
    Optional<UserNotification> findByUserNotificationId(@Param("userNotificationId") UserNotificationId userNotificationId);

}
