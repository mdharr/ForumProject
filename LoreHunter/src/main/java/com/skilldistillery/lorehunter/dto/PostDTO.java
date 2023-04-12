package com.skilldistillery.lorehunter.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostDTO {
	
	private int id;
	private String subject;
	private String content;
	private LocalDateTime createdAt;
	private String status;
	private LocalDateTime lastEdited;
	private Integer commentCount;
	private Integer userId;
	private Integer categoryId;
	private List<Integer> commentIds;
	private Integer viewCount;
	private Boolean enabled;

	public PostDTO() {
		super();
	}

	public PostDTO(int id, String subject, String content, LocalDateTime createdAt, String status,
			LocalDateTime lastEdited, Integer commentCount, Integer userId, Integer categoryId,
			List<Integer> commentIds, Integer viewCount, Boolean enabled) {
		super();
		this.id = id;
		this.subject = subject;
		this.content = content;
		this.createdAt = createdAt;
		this.status = status;
		this.lastEdited = lastEdited;
		this.commentCount = commentCount;
		this.userId = userId;
		this.categoryId = categoryId;
		this.commentIds = commentIds;
		this.viewCount = viewCount;
		this.enabled = enabled;
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

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public List<Integer> getCommentIds() {
		return commentIds;
	}

	public void setCommentIds(List<Integer> commentIds) {
		this.commentIds = commentIds;
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
}
