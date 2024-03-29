package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PostPersist;
import javax.persistence.PostUpdate;

import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.skilldistillery.lorehunter.annotations.ExcludeOnUpdate;

@Entity
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String subject;
	
	private String content;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	private String status;
	
	@UpdateTimestamp
	@Column(name = "last_edited")
	private LocalDateTime lastEdited;
	
	@Column(name = "comment_count")
	private Integer commentCount;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIdentityReference(alwaysAsId = true)
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	@JsonBackReference
	private Category category;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	@Formula("(SELECT MAX(c.created_at) FROM comment c WHERE c.post_id = id)")
	private List<Comment> comments;
	
	@Column(name = "view_count")
	private Integer viewCount;
	
	private Boolean enabled;
	
	@Column(name = "is_pinned")
	private Boolean isPinned;
	
	@Column(name = "last_comment")
	private LocalDateTime lastComment;

	public Post() {
		super();
	}

	public Post(int id, String subject, String content, LocalDateTime createdAt, String status, LocalDateTime lastEdited,
			Integer commentCount, User user, Category category, List<Comment> comments, Integer viewCount, Boolean enabled, Boolean isPinned, LocalDateTime lastComment) {
		super();
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.createdAt = createdAt;
		this.status = status;
		this.lastEdited = lastEdited;
		this.commentCount = commentCount;
		this.user = user;
		this.category = category;
		this.comments = comments;
		this.viewCount = viewCount;
		this.enabled = enabled;
		this.isPinned = isPinned;
		this.lastComment = lastComment;
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
	
	public Integer getViewCount() {
		return viewCount;
	}

	public void setViewCount(Integer viewCount) {
		this.viewCount = viewCount;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getIsPinned() {
		return isPinned;
	}

	public void setIsPinned(Boolean isPinned) {
		this.isPinned = isPinned;
	}

	public LocalDateTime getLastComment() {
		return lastComment;
	}

	public void setLastComment(LocalDateTime lastComment) {
		this.lastComment = lastComment;
	}
	
	@PostPersist
	@PostUpdate
	private void updateLastComment() {
	    this.lastComment = LocalDateTime.now();
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
		StringBuilder builder = new StringBuilder();
		builder.append("Post [id=");
		builder.append(id);
		builder.append(", subject=");
		builder.append(subject);
		builder.append(", content=");
		builder.append(content);
		builder.append(", createdAt=");
		builder.append(createdAt);
		builder.append(", status=");
		builder.append(status);
		builder.append(", lastEdited=");
		builder.append(lastEdited);
		builder.append(", commentCount=");
		builder.append(commentCount);
		builder.append(", user=");
		builder.append(user);
		builder.append(", category=");
		builder.append(category);
		builder.append(", viewCount=");
		builder.append(viewCount);
		builder.append(", enabled=");
		builder.append(enabled);
		builder.append(", isPinned=");
		builder.append(isPinned);
		builder.append(", lastComment=");
		builder.append(lastComment);
		builder.append("]");
		return builder.toString();
	}

}
