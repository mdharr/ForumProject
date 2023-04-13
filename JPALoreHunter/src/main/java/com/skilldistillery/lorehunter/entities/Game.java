package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Game {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "api_key")
	private String apiKey;
	
	private String url;
	
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	public Game() {
		super();
	}

	public Game(int id, String apiKey, String url, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.apiKey = apiKey;
		this.url = url;
		this.createdAt = createdAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public int hashCode() {
		return Objects.hash(apiKey, createdAt, id, url);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Game other = (Game) obj;
		return Objects.equals(apiKey, other.apiKey) && Objects.equals(createdAt, other.createdAt) && id == other.id
				&& Objects.equals(url, other.url);
	}

	@Override
	public String toString() {
		return "Game [id=" + id + ", apiKey=" + apiKey + ", url=" + url + ", createdAt=" + createdAt + "]";
	}
	
	

}
