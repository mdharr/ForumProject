package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Notification {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String message;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	private boolean viewed;
	
	@Column(name = "viewed_at")
	private LocalDateTime viewedAt;
	
	private boolean dismissed;
	
	@Column(name = "dismissed_at")
	private LocalDateTime dismissedAt;
	
	@JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_notification", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "notification_id"))
    private List<User> users;

	public Notification() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Notification(int id, String message, LocalDateTime createdAt, boolean viewed, LocalDateTime viewedAt,
			boolean dismissed, LocalDateTime dismissedAt, List<User> users) {
		super();
		this.id = id;
		this.message = message;
		this.createdAt = createdAt;
		this.viewed = viewed;
		this.viewedAt = viewedAt;
		this.dismissed = dismissed;
		this.dismissedAt = dismissedAt;
		this.users = users;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
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

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
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
		Notification other = (Notification) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Notification [id=");
		builder.append(id);
		builder.append(", message=");
		builder.append(message);
		builder.append(", createdAt=");
		builder.append(createdAt);
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
