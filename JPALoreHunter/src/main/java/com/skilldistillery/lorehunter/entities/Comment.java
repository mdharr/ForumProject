package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String content;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	private String status;
	
	@UpdateTimestamp
	@Column(name = "last_edited")
	private LocalDateTime lastEdited;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "post_id")
	private Post post;
	
	private Boolean enabled;
	
	// parent/child single table
	@JsonIgnore
	@Transient
    private Integer commentId;

    @ManyToOne(fetch = FetchType.LAZY, optional=true)
    @JoinColumn(name="parent_id")
    private Comment parentComment;
    
//    @JsonIgnore
//    @OneToMany(mappedBy="comment", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval=true)
//    private Set<Comment> childComment = new HashSet<Comment>();

	public Comment() {
		super();
	}

	public Comment(int id, String content, LocalDateTime createdAt, String status, LocalDateTime lastEdited, User user,
			Post post, Boolean enabled, Integer commentId, Comment parentComment) {
		super();
		this.id = id;
		this.content = content;
		this.createdAt = createdAt;
		this.status = status;
		this.lastEdited = lastEdited;
		this.user = user;
		this.post = post;
		this.enabled = enabled;
		this.commentId = commentId;
		this.parentComment = parentComment;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public Comment getParentComment() {
		return parentComment;
	}

	public void setParentComment(Comment parentComment) {
		this.parentComment = parentComment;
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
		Comment other = (Comment) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Comment [id=");
		builder.append(id);
		builder.append(", content=");
		builder.append(content);
		builder.append(", createdAt=");
		builder.append(createdAt);
		builder.append(", status=");
		builder.append(status);
		builder.append(", lastEdited=");
		builder.append(lastEdited);
		builder.append(", user=");
		builder.append(user);
		builder.append(", post=");
		builder.append(post);
		builder.append(", enabled=");
		builder.append(enabled);
		builder.append(", commentId=");
		builder.append(commentId);
		builder.append(", parentComment=");
		builder.append(parentComment);
		builder.append("]");
		return builder.toString();
	}
	
	
	

}
