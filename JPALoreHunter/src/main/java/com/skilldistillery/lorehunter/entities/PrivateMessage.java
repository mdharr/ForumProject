package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "private_message")
public class PrivateMessage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String content;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "user_conversation_id")
	private UserConversation userConversation;

	@ManyToOne
	@JoinColumn(name = "sender_id")
	private User sender;
	
	@ManyToOne
	@JoinColumn(name = "recipient_id")
	private User recipient;

	public PrivateMessage() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PrivateMessage(int id, String content, LocalDateTime createdAt, UserConversation userConversation,
			User sender, User recipient) {
		super();
		this.id = id;
		this.content = content;
		this.createdAt = createdAt;
		this.userConversation = userConversation;
		this.sender = sender;
		this.recipient = recipient;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public UserConversation getUserConversation() {
		return userConversation;
	}

	public void setUserConversation(UserConversation userConversation) {
		this.userConversation = userConversation;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}
	
	public User getRecipient() {
		return recipient;
	}
	
	public void setRecipient(User recipient) {
		this.recipient = recipient;
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
		PrivateMessage other = (PrivateMessage) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("PrivateMessage [id=");
		builder.append(id);
		builder.append(", content=");
		builder.append(content);
		builder.append(", createdAt=");
		builder.append(createdAt);
		builder.append(", userConversation=");
		builder.append(userConversation);
		builder.append(", sender=");
		builder.append(sender);
		builder.append(", recipient=");
		builder.append(recipient);
		builder.append("]");
		return builder.toString();
	}

}
