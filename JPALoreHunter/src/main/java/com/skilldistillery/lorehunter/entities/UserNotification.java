package com.skilldistillery.lorehunter.entities;

import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user_notification")
public class UserNotification {
	
	@EmbeddedId
	private UserNotificationId id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	@MapsId(value = "userId")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "notification_id")
	@MapsId(value = "notificationId")
	private Notification notification;

	public UserNotification() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserNotification(UserNotificationId id, User user, Notification notification) {
		super();
		this.id = id;
		this.user = user;
		this.notification = notification;
	}

	public UserNotificationId getId() {
		return id;
	}

	public void setId(UserNotificationId id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserNotification other = (UserNotification) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserNotification [id=");
		builder.append(id);
		builder.append(", user=");
		builder.append(user);
		builder.append(", notification=");
		builder.append(notification);
		builder.append("]");
		return builder.toString();
	}
	
}
