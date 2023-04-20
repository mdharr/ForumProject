package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String username;

	private String password;

	private Boolean enabled;

	private String role;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	private String email;
	
	private String state;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@UpdateTimestamp
	@Column(name = "last_activity")
	private LocalDateTime lastActivity;
	
	private String status;
	
	@Column(name = "comment_count")
	private Integer commentCount;
	
	@Column(name = "banner_message")
	private String bannerMessage;
	
	@Column(name = "banner_image")
	private String bannerImage;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<Category> categories;
	
	@OneToMany(mappedBy = "user")
	@JsonBackReference("posts")
	private List<Post> posts;
	
	@OneToMany(mappedBy = "user")
	@JsonBackReference("comments")
	private List<Comment> comments;
	
	@Column(name = "post_count")
	private Integer postCount;
	
	@Column(name = "is_online")
	private Boolean isOnline;
	
	@OneToMany(mappedBy = "user")
	private List<UserGame> userGames;

	public User() {
		super();
	}

	public User(int id, String username, String password, Boolean enabled, String role, String firstName,
			String lastName, String email, String state, LocalDateTime createdAt, String imageUrl,
			LocalDateTime lastActivity, String status, Integer commentCount, String bannerMessage, String bannerImage,
			List<Category> categories, List<Post> posts, List<Comment> comments, Integer postCount, Boolean isOnline,
			List<UserGame> userGames) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.role = role;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.state = state;
		this.createdAt = createdAt;
		this.imageUrl = imageUrl;
		this.lastActivity = lastActivity;
		this.status = status;
		this.commentCount = commentCount;
		this.bannerMessage = bannerMessage;
		this.bannerImage = bannerImage;
		this.categories = categories;
		this.posts = posts;
		this.comments = comments;
		this.postCount = postCount;
		this.isOnline = isOnline;
		this.userGames = userGames;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getState() {
		return state;
	}
	
	public void setState(String state) {
		this.state = state;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public LocalDateTime getLastActivity() {
		return lastActivity;
	}

	public void setLastActivity(LocalDateTime lastActivity) {
		this.lastActivity = lastActivity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public String getBannerMessage() {
		return bannerMessage;
	}

	public void setBannerMessage(String bannerMessage) {
		this.bannerMessage = bannerMessage;
	}
	
	public String getBannerImage() {
		return bannerImage;
	}
	
	public void setBannerImage(String bannerImage) {
		this.bannerImage = bannerImage;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Integer getPostCount() {
		return postCount;
	}

	public void setPostCount(Integer postCount) {
		this.postCount = postCount;
	}

	public Boolean getIsOnline() {
		return isOnline;
	}

	public void setIsOnline(Boolean isOnline) {
		this.isOnline = isOnline;
	}

	public List<UserGame> getUserGames() {
		return userGames;
	}

	public void setUserGames(List<UserGame> userGames) {
		this.userGames = userGames;
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
		User other = (User) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", enabled=" + enabled
				+ ", role=" + role + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", state=" + state + ", createdAt=" + createdAt + ", imageUrl=" + imageUrl + ", lastActivity="
				+ lastActivity + ", status=" + status + ", commentCount=" + commentCount + ", bannerMessage="
				+ bannerMessage + ", bannerImage=" + bannerImage + ", postCount=" + postCount + ", isOnline=" + isOnline + "]";
	}
		
}
