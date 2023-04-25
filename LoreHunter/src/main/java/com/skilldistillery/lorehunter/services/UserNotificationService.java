package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.UserNotification;

public interface UserNotificationService {

	UserNotification dismissUserNotification(int userId, int notificationId);
	
	List<UserNotification> getUnreadNotificationsByUserId(int userId);


}
