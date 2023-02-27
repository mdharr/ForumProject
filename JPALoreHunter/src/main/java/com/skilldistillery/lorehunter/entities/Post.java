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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String subject;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	private String status;
	
	@Column(name = "last_edited")
	private LocalDateTime lastEdited;
	
	@Column(name = "comment_count")
	private Integer commentCount;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@OneToMany(mappedBy = "post")
	private List<Comment> comments;

	public Post() {
		super();
	}

	public Post(int id, String subject, LocalDateTime createdAt, String status, LocalDateTime lastEdited,
			Integer commentCount, User user, Category category, List<Comment> comments) {
		super();
		this.id = id;
		this.subject = subject;
		this.createdAt = createdAt;
		this.status = status;
		this.lastEdited = lastEdited;
		this.commentCount = commentCount;
		this.user = user;
		this.category = category;
		this.comments = comments;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getLastEdited() {
		return lastEdited;
	}

	public void setLastEdited(LocalDateTime lastEdited) {
		this.lastEdited = lastEdited;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
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
		Post other = (Post) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Post [id=" + id + ", subject=" + subject + ", createdAt=" + createdAt + ", status=" + status
				+ ", lastEdited=" + lastEdited + ", commentCount=" + commentCount + ", user=" + user + ", category="
				+ category + ", comments=" + comments + "]";
	}

}
