package com.skilldistillery.lorehunter.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserNotification;
import com.skilldistillery.lorehunter.entities.UserNotificationId;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Integer>{
	
	UserNotification findByUserAndNotification(User user, Notification notification);
	
	UserNotification findByUserIdAndNotificationId(int userId, int notificationId);
	
	List<UserNotification> findByUserId(int userId);
	
	@Query("SELECT u FROM UserNotification u WHERE u.id = :userNotificationId")
    Optional<UserNotification> findByUserNotificationId(@Param("userNotificationId") UserNotificationId userNotificationId);
	
    @Modifying
    @Transactional
    @Query("DELETE FROM UserNotification un WHERE un.id.notificationId = :notificationId")
    void deleteByNotificationId(@Param("notificationId") int notificationId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserNotification un WHERE un.id.userId = :userId")
    void deleteByUserId(@Param("userId") int userId);

    @Transactional
    default void addUserNotification(UserNotification userNotification) {
        save(userNotification);
    }

    @Transactional
    default void removeUserNotification(UserNotification userNotification) {
        delete(userNotification);
    }

}
