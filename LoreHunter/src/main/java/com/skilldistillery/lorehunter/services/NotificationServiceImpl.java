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
    
    @Override
    public List<Notification> getUnreadNotificationsByUserId(int userId) {
        List<Notification> notifications = new ArrayList<>();
        List<UserNotification> userNotifications = userNotificationRepo.findByUserId(userId);
        for (UserNotification userNotification : userNotifications) {
            if (!userNotification.isViewed()) {
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
    public UserNotification dismissNotification(int userId, int notificationId) {
        UserNotification userNotification = userNotificationRepo.findByUserIdAndNotificationId(userId, notificationId);
        if (userNotification == null) {
            throw new RuntimeException("User notification with user ID " + userId + " and notification ID " + notificationId + " not found.");
        }
        userNotification.setDismissed(true);
        userNotification.setDismissedAt(LocalDateTime.now());
        userNotificationRepo.save(userNotification);
        return userNotification;
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
    	return notificationRepo.findAll();
    }

    @Override
    public void sendNotification(Notification notification, List<User> users) {
        notificationRepo.save(notification);
        for (User user : users) {
            UserNotification userNotification = new UserNotification(user, notification);
            userNotification.setViewed(false);
            userNotification.setDismissed(false);
            userNotificationRepo.addUserNotification(userNotification);
        }
    }

    @Override
    public void deleteNotification(int notificationId) {
        userNotificationRepo.deleteByNotificationId(notificationId);
        notificationRepo.deleteById(notificationId);
    }


}
