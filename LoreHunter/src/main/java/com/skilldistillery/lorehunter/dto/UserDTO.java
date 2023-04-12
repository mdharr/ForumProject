package com.skilldistillery.lorehunter.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UserDTO {

	private int id;

	private String username;

	private String firstName;

	private String lastName;

	private String email;

	private String state;

	private String imageUrl;

	private String status;

	private Integer commentCount;

	private String bannerMessage;

	private String bannerImage;

	private Integer postCount;

	private Boolean isOnline;

	public UserDTO() {
		super();
	}

	public UserDTO(int id, String username, String firstName, String lastName, String email, String state,
			String imageUrl, String status, Integer commentCount, String bannerMessage, String bannerImage,
			Integer postCount, Boolean isOnline) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.state = state;
		this.imageUrl = imageUrl;
		this.status = status;
		this.commentCount = commentCount;
		this.bannerMessage = bannerMessage;
		this.bannerImage = bannerImage;
		this.postCount = postCount;
		this.isOnline = isOnline;
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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

}
