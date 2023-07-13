package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
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
	
	private boolean viewed;
	
	@Column(name = "viewed_at")
	private LocalDateTime viewedAt;
	
	private boolean dismissed;
	
	@Column(name = "dismissed_at")
	private LocalDateTime dismissedAt;

	public UserNotification() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public UserNotification(User user, Notification notification) {
		super();
		this.id = new UserNotificationId(user.getId(), notification.getId());
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

	public boolean isViewed() {
		return viewed;
	}

	public void setViewed(boolean viewed) {
		this.viewed = viewed;
	}

	public LocalDateTime getViewedAt() {
		return viewedAt;
	}

	public void setViewedAt(LocalDateTime viewedAt) {
		this.viewedAt = viewedAt;
	}

	public boolean isDismissed() {
		return dismissed;
	}

	public void setDismissed(boolean dismissed) {
		this.dismissed = dismissed;
	}

	public LocalDateTime getDismissedAt() {
		return dismissedAt;
	}

	public void setDismissedAt(LocalDateTime dismissedAt) {
		this.dismissedAt = dismissedAt;
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
		builder.append(", viewed=");
		builder.append(viewed);
		builder.append(", viewedAt=");
		builder.append(viewedAt);
		builder.append(", dismissed=");
		builder.append(dismissed);
		builder.append(", dismissedAt=");
		builder.append(dismissedAt);
		builder.append("]");
		return builder.toString();
	}
	
}
