package com.skilldistillery.lorehunter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.repositories.NotificationRepository;

public class NotificationServiceImpl implements NotificationService{
	
    @Autowired
    private NotificationRepository notificationRepo;

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

}
