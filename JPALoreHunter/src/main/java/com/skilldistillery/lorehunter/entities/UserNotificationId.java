package com.skilldistillery.lorehunter.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;

@Embeddable
@Table(name = "user_notification")
public class UserNotificationId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "notification_id")
	private int notificationId;

	public UserNotificationId() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserNotificationId(int userId, int notificationId) {
		super();
		this.userId = userId;
		this.notificationId = notificationId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(int notificationId) {
		this.notificationId = notificationId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(notificationId, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserNotificationId other = (UserNotificationId) obj;
		return notificationId == other.notificationId && userId == other.userId;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserNotificationId [userId=");
		builder.append(userId);
		builder.append(", notificationId=");
		builder.append(notificationId);
		builder.append("]");
		return builder.toString();
	}
	
}
