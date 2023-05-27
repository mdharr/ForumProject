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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Game {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	@JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_has_game",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id"))
    private List<User> users;

	private String title;
	private String description;
	private String released;
	
	@Column(name = "background_image")
	private String backgroundImage;
	
	@Column(name = "metacritic_score")
	private int metacriticScore;

	public Game() {
		super();
	}

	public Game(int id, LocalDateTime createdAt, List<User> users, String title,
			String description, String released, String backgroundImage, int metacriticScore) {
		super();
		this.id = id;
		this.createdAt = createdAt;
		this.users = users;
		this.title = title;
		this.description = description;
		this.released = released;
		this.backgroundImage = backgroundImage;
		this.metacriticScore = metacriticScore;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReleased() {
		return released;
	}

	public void setReleased(String released) {
		this.released = released;
	}

	public String getBackgroundImage() {
		return backgroundImage;
	}

	public void setBackgroundImage(String backgroundImage) {
		this.backgroundImage = backgroundImage;
	}
	
	public int getMetacriticScore() {
		return metacriticScore;
	}
	
	public void setMetacriticScore(int metacriticScore) {
		this.metacriticScore = metacriticScore;
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
		Game other = (Game) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Game [id=");
		builder.append(id);
		builder.append(", createdAt=");
		builder.append(createdAt);
		builder.append(", users=");
		builder.append(users);
		builder.append(", title=");
		builder.append(title);
		builder.append(", description=");
		builder.append(description);
		builder.append(", released=");
		builder.append(released);
		builder.append(", backgroundImage=");
		builder.append(backgroundImage);
		builder.append(", metacriticScore=");
		builder.append(metacriticScore);
		builder.append("]");
		return builder.toString();
	}

}
