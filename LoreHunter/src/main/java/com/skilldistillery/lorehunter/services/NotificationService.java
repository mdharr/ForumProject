package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.Notification;

public interface NotificationService {

	List<Notification> getAllNotifications();

	Notification getNotificationById(int id);

	Notification createNotification(Notification notification);

	Notification updateNotification(Notification notification);

	void deleteNotificationById(int id);

}
