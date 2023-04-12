package com.skilldistillery.lorehunter.dto;

import java.time.LocalDateTime;

public class CommentDTO {

    private int id;
    private String content;
    private LocalDateTime createdAt;
    private String status;
    private LocalDateTime lastEdited;
    private int userId; // or UserDto if needed
    private int postId; // or PostDto if needed
    private Boolean enabled;

    // Default constructor
    public CommentDTO() {
        super();
    }

    // Parameterized constructor
    public CommentDTO(int id, String content, LocalDateTime createdAt, String status, LocalDateTime lastEdited,
            int userId, int postId, Boolean enabled) {
        super();
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.status = status;
        this.lastEdited = lastEdited;
        this.userId = userId;
        this.postId = postId;
        this.enabled = enabled;
    }

    // Getters and Setters
    // Note: You can use Lombok or other libraries to generate getters and setters automatically

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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

}
