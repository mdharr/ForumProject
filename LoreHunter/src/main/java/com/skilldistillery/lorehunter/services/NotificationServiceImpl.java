package com.skilldistillery.lorehunter.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserNotification;
import com.skilldistillery.lorehunter.repositories.NotificationRepository;
import com.skilldistillery.lorehunter.repositories.UserNotificationRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class NotificationServiceImpl implements NotificationService{
	
    @Autowired
    private NotificationRepository notificationRepo;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private UserNotificationRepository userNotificationRepo;
    
    public List<Notification> getUnreadNotificationsByUserId(int userId) {
        List<Notification> notifications = new ArrayList<>();
        List<UserNotification> userNotifications = userNotificationRepo.findByUserId(userId);
        for (UserNotification userNotification : userNotifications) {
            if (!userNotification.getNotification().isRead()) {
                Notification notification = notificationRepo.findById(userNotification.getNotification().getId());
                if (notification != null) {
                    notifications.add(notification);
                }
            }
        }
        return notifications;
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepo.findAll();
    }

    @Override
    public Notification getNotificationById(int id) {
        return notificationRepo.findById(id);
    }

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepo.save(notification);
    }

    @Override
    public Notification updateNotification(int id, Notification updatedNotification) {
      Notification notificationToUpdate = notificationRepo.findById(id);
      if (notificationToUpdate == null) {
        throw new RuntimeException("Notification with ID " + id + " not found.");
      }
      if (!notificationToUpdate.isDismissed()) {
        notificationToUpdate.setDismissed(true);
        notificationToUpdate.setDismissedAt(LocalDateTime.now());
        notificationToUpdate.setRead(true);
        notificationToUpdate.setReadAt(LocalDateTime.now());
      }
      return notificationRepo.save(notificationToUpdate);
    }

    @Override
    public void deleteNotificationById(int id) {
        notificationRepo.deleteById(id);
    }

    @Override
    public List<Notification> getNotifications() {
        return notificationRepo.findAll();
    }
    
    @Override
    public List<Notification> getActiveNotifications() {
    	List<Notification> activeNotifications = new ArrayList<>();
    	List<Notification> notifications = notificationRepo.findAll();
    	for (Notification notification : notifications) {
			if(!notification.isDismissed()) {
				activeNotifications.add(notification);
			}
			return activeNotifications;
		}
    	return null;
    }

    @Override
    public void sendNotification(Notification notification, List<User> users) {
        notificationRepo.save(notification);
        for (User user : users) {
            UserNotification userNotification = new UserNotification(user, notification);
            userNotificationRepo.addUserNotification(userNotification);
        }
    }

    @Override
    public void deleteNotification(int notificationId) {
        userNotificationRepo.deleteByNotificationId(notificationId);
        notificationRepo.deleteById(notificationId);
    }


}
