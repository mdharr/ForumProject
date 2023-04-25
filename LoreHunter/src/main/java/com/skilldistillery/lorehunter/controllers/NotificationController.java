package com.skilldistillery.lorehunter.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.lorehunter.entities.Notification;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.services.NotificationService;
import com.skilldistillery.lorehunter.services.UserService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class NotificationController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private NotificationService notificationService;
	
	// postman success
	@GetMapping("notifications")
	public List<Notification> getAllNotifications() {
	    return notificationService.getAllNotifications();
	}

	@GetMapping("notifications/{id}")
	public ResponseEntity<Notification> getNotificationById(@PathVariable int id) {
	    Notification notification = notificationService.getNotificationById(id);
	    if (notification == null) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	    return new ResponseEntity<>(notification, HttpStatus.OK);
	}
	
	@PostMapping("notifications")
	public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
	    // Set initial isDismissed value to false
	    notification.setDismissed(false);

	    // Send notification to all users
	    List<User> allUsers = userService.index();
	    notificationService.sendNotification(notification, allUsers);

	    // Return created notification with status 201 Created
	    return new ResponseEntity<>(notificationService.createNotification(notification), HttpStatus.CREATED);
	}

}
