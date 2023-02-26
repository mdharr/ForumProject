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
public class Thread {
	
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
	
	@Column(name = "postCount")
	private int postCount;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "forum_id")
	private Forum forum;
	
	@OneToMany(mappedBy = "thread")
	private List<Post> posts;

	public Thread() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Thread(int id, String subject, LocalDateTime createdAt, String status, LocalDateTime lastEdited,
			int postCount, User user, Forum forum, List<Post> posts) {
		super();
		this.id = id;
		this.subject = subject;
		this.createdAt = createdAt;
		this.status = status;
		this.lastEdited = lastEdited;
		this.postCount = postCount;
		this.user = user;
		this.forum = forum;
		this.posts = posts;
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

	public int getPostCount() {
		return postCount;
	}

	public void setPostCount(int postCount) {
		this.postCount = postCount;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Forum getForum() {
		return forum;
	}

	public void setForum(Forum forum) {
		this.forum = forum;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
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
		Thread other = (Thread) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Thread [id=" + id + ", subject=" + subject + ", createdAt=" + createdAt + ", status=" + status
				+ ", lastEdited=" + lastEdited + ", postCount=" + postCount + ", user=" + user + ", forum=" + forum
				+ ", posts=" + posts + "]";
	}

}
