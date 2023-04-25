package com.skilldistillery.lorehunter.services;

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
    private NotificationService notificationService;
    
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
    public Notification updateNotification(Notification notification) {
        return notificationRepo.save(notification);
    }

    @Override
    public void deleteNotificationById(int id) {
        notificationRepo.deleteById(id);
    }

    public List<Notification> getNotifications() {
        return notificationRepo.findAll();
    }

    public void sendNotification(Notification notification, List<User> users) {
        notificationRepo.save(notification);
        for (User user : users) {
            UserNotification userNotification = new UserNotification(user, notification);
            userNotificationRepo.addUserNotification(userNotification);
        }
    }

    public void deleteNotification(int notificationId) {
        userNotificationRepo.deleteByNotificationId(notificationId);
        notificationRepo.deleteById(notificationId);
    }

}
