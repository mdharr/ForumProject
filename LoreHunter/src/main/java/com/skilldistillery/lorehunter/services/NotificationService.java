package com.skilldistillery.lorehunter.services;

import java.util.List;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.entities.User;

public interface NotificationService {

	List<Notification> getAllNotifications();

	Notification getNotificationById(int id);

	Notification createNotification(Notification notification);

	Notification updateNotification(int id, Notification updatedNotification);

	void deleteNotificationById(int id);

	List<Notification> getNotifications();

	void sendNotification(Notification notification, List<User> users);

	void deleteNotification(int notificationId);

	List<Notification> getActiveNotifications();


}
