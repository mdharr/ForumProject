package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
import com.skilldistillery.lorehunter.enums.VerifiedStatus;

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
	
	@Column(name = "verification_code")
	private String verificationCode;
	
    @Enumerated(EnumType.STRING)
    @Column(name = "verified_status")
    private VerifiedStatus verifiedStatus;
	
    @Column(name = "email_verified")
	private boolean emailVerified;
	
    @Column(name = "verification_expiry_time")
	private LocalDateTime verificationExpiryTime;
	
    @Column(name = "resend_count")
	private int resendCount;
	
    @Column(name = "last_verification_code_sent_time")
	private LocalDateTime lastVerificationCodeSentTime;
    
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<TicketMessage> ticketMessages = new ArrayList<>();
    
    @JsonIgnore
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private List<PrivateMessage> sentMessages = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<PrivateMessage> receivedMessages = new ArrayList<>();

	public User() {
		super();
	}

	public User(int id, String username, String password, Boolean enabled, String role, String firstName,
			String lastName, String email, String state, LocalDateTime createdAt, String imageUrl,
			LocalDateTime lastActivity, String status, Integer commentCount, String bannerMessage, String bannerImage,
			List<Category> categories, List<Post> posts, List<Comment> comments, Integer postCount, Boolean isOnline,
			List<UserGame> userGames, String verificationCode, VerifiedStatus verifiedStatus, boolean emailVerified,
			LocalDateTime verificationExpiryTime, int resendCount, LocalDateTime lastVerificationCodeSentTime, List<TicketMessage> ticketMessages,
			List<PrivateMessage> sentMessages, List<PrivateMessage> receivedMessages) {
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
		this.verificationCode = verificationCode;
		this.verifiedStatus = verifiedStatus;
		this.emailVerified = emailVerified;
		this.verificationExpiryTime = verificationExpiryTime;
		this.resendCount = resendCount;
		this.lastVerificationCodeSentTime = lastVerificationCodeSentTime;
		this.ticketMessages = ticketMessages;
		this.sentMessages = sentMessages;
		this.receivedMessages = receivedMessages;
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

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

	public VerifiedStatus getVerifiedStatus() {
		return verifiedStatus;
	}

	public void setVerifiedStatus(VerifiedStatus verifiedStatus) {
		this.verifiedStatus = verifiedStatus;
	}

	public boolean isEmailVerified() {
		return emailVerified;
	}

	public void setEmailVerified(boolean emailVerified) {
		this.emailVerified = emailVerified;
	}

	public LocalDateTime getVerificationExpiryTime() {
		return verificationExpiryTime;
	}

	public void setVerificationExpiryTime(LocalDateTime verificationExpiryTime) {
		this.verificationExpiryTime = verificationExpiryTime;
	}

	public int getResendCount() {
		return resendCount;
	}

	public void setResendCount(int resendCount) {
		this.resendCount = resendCount;
	}

	public LocalDateTime getLastVerificationCodeSentTime() {
		return lastVerificationCodeSentTime;
	}

	public void setLastVerificationCodeSentTime(LocalDateTime lastVerificationCodeSentTime) {
		this.lastVerificationCodeSentTime = lastVerificationCodeSentTime;
	}

	public List<TicketMessage> getTicketMessages() {
		return ticketMessages;
	}

	public void setTicketMessages(List<TicketMessage> ticketMessages) {
		this.ticketMessages = ticketMessages;
	}
	
	public List<PrivateMessage> getSentMessages() {
		return sentMessages;
	}
	
	public void setSentMessages(List<PrivateMessage> sentMessages) {
		this.sentMessages = sentMessages;
	}
	
	public List<PrivateMessage> getReceivedMessages() {
		return receivedMessages;
	}
	
	public void setReceivedMessages(List<PrivateMessage> receivedMessages) {
		this.receivedMessages = receivedMessages;
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
		StringBuilder builder = new StringBuilder();
		builder.append("User [id=");
		builder.append(id);
		builder.append(", username=");
		builder.append(username);
		builder.append(", password=");
		builder.append(password);
		builder.append(", enabled=");
		builder.append(enabled);
		builder.append(", role=");
		builder.append(role);
		builder.append(", firstName=");
		builder.append(firstName);
		builder.append(", lastName=");
		builder.append(lastName);
		builder.append(", email=");
		builder.append(email);
		builder.append(", state=");
		builder.append(state);
		builder.append(", createdAt=");
		builder.append(createdAt);
		builder.append(", imageUrl=");
		builder.append(imageUrl);
		builder.append(", lastActivity=");
		builder.append(lastActivity);
		builder.append(", status=");
		builder.append(status);
		builder.append(", commentCount=");
		builder.append(commentCount);
		builder.append(", bannerMessage=");
		builder.append(bannerMessage);
		builder.append(", bannerImage=");
		builder.append(bannerImage);
		builder.append(", categories=");
		builder.append(categories);
		builder.append(", posts=");
		builder.append(posts);
		builder.append(", comments=");
		builder.append(comments);
		builder.append(", postCount=");
		builder.append(postCount);
		builder.append(", isOnline=");
		builder.append(isOnline);
		builder.append(", userGames=");
		builder.append(userGames);
		builder.append(", verificationCode=");
		builder.append(verificationCode);
		builder.append(", verifiedStatus=");
		builder.append(verifiedStatus);
		builder.append(", emailVerified=");
		builder.append(emailVerified);
		builder.append(", verificationExpiryTime=");
		builder.append(verificationExpiryTime);
		builder.append(", resendCount=");
		builder.append(resendCount);
		builder.append(", lastVerificationCodeSentTime=");
		builder.append(lastVerificationCodeSentTime);
		builder.append(", ticketMessages=");
		builder.append(ticketMessages);
		builder.append(", sentMessages=");
		builder.append(sentMessages);
		builder.append(", receivedMessages=");
		builder.append(receivedMessages);
		builder.append("]");
		return builder.toString();
	}

		
}
