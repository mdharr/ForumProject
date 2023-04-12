package com.skilldistillery.lorehunter.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CategoryDTO {

	private int id;
	private String name;
	private String description;
	private LocalDateTime createdAt;
	private String status;
	private Integer viewCount;
	private Integer postCount;
	private Integer commentCount;
	private Boolean enabled;

	public CategoryDTO() {
		super();
	}

	public CategoryDTO(int id, String name, String description, LocalDateTime createdAt, String status,
			Integer viewCount, Integer postCount, Integer commentCount, Boolean enabled) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.createdAt = createdAt;
		this.status = status;
		this.viewCount = viewCount;
		this.postCount = postCount;
		this.commentCount = commentCount;
		this.enabled = enabled;
	}

	// Getters and Setters

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

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

}
