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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String description;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	private String status;
	
	@Column(name = "view_count")
	private Integer viewCount;
	
	@Column(name = "post_count")
	private Integer postCount;
	
	@Column(name = "comment_count")
	private Integer commentCount;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToMany(mappedBy = "category")
	@JsonManagedReference
	private List<Post> posts;
	
	private Boolean enabled;

	public Category() {
		super();
	}

	public Category(int id, String name, String description, LocalDateTime createdAt, String status, Integer viewCount,
			Integer postCount, Integer commentCount, User user, List<Post> posts, Boolean enabled) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.createdAt = createdAt;
		this.status = status;
		this.viewCount = viewCount;
		this.postCount = postCount;
		this.commentCount = commentCount;
		this.user = user;
		this.posts = posts;
		this.enabled = enabled;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public Integer getViewCount() {
		return viewCount;
	}

	public void setViewCount(Integer viewCount) {
		this.viewCount = viewCount;
	}

	public Integer getPostCount() {
		return postCount;
	}

	public void setPostCount(Integer postCount) {
		this.postCount = postCount;
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

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
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
		Category other = (Category) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Category [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", description=");
		builder.append(description);
		builder.append(", createdAt=");
		builder.append(createdAt);
		builder.append(", status=");
		builder.append(status);
		builder.append(", viewCount=");
		builder.append(viewCount);
		builder.append(", postCount=");
		builder.append(postCount);
		builder.append(", commentCount=");
		builder.append(commentCount);
		builder.append(", user=");
		builder.append(user);
		builder.append(", posts=");
		builder.append(posts);
		builder.append(", enabled=");
		builder.append(enabled);
		builder.append("]");
		return builder.toString();
	}
	
	


}
