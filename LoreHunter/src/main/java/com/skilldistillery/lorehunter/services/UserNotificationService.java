package com.skilldistillery.lorehunter.services;

import com.skilldistillery.lorehunter.entities.UserNotification;

public interface UserNotificationService {

	UserNotification dismissUserNotification(int userId, int notificationId);

}
