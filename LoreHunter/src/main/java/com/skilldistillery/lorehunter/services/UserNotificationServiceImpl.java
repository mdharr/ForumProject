package com.skilldistillery.lorehunter.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.UserNotification;
import com.skilldistillery.lorehunter.repositories.UserNotificationRepository;

@Service
public class UserNotificationServiceImpl implements UserNotificationService {
	
	@Autowired
	private UserNotificationRepository userNotificationRepo;
	
	@Override
	public UserNotification dismissUserNotification(int userId, int notificationId) {
	    UserNotification userNotification = userNotificationRepo.findByUserIdAndNotificationId(userId, notificationId);
	    if (userNotification == null) {
	        throw new RuntimeException("User notification with user ID " + userId + " and notification ID " + notificationId + " not found.");
	    }
	    userNotification.setViewed(true);
	    userNotification.setViewedAt(LocalDateTime.now());
	    userNotification.setDismissed(true);
	    userNotification.setDismissedAt(LocalDateTime.now());
	    userNotificationRepo.save(userNotification);
	    return userNotification;
	}

	@Override
	public List<UserNotification> getUnreadNotificationsByUserId(int userId) {
        return userNotificationRepo.findByUserId(userId);
	}

}
