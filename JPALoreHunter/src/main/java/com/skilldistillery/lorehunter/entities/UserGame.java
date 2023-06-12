package com.skilldistillery.lorehunter.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.skilldistillery.lorehunter.enums.GameCategory;
import com.skilldistillery.lorehunter.enums.GameRating;

@Entity
@Table(name = "user_has_game")
public class UserGame {
	
    @EmbeddedId
    private UserGameId id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @MapsId("userId")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id")
    @MapsId("gameId")
    private Game game;

    @Column(name = "game_category")
    @Enumerated(EnumType.STRING)
    private GameCategory gameCategory = GameCategory.PLAYING;

    @Enumerated(EnumType.STRING)
    private GameRating rating = GameRating.ZERO;
    
    private String review;
    
    @Column(name = "is_recommended")
    private Boolean isRecommended;
    
    private Integer playtime;
    
	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	
	public UserGame() {
		super();
	}
	
	public UserGame(UserGameId id, User user, Game game, GameCategory gameCategory, GameRating rating, String review, Boolean isRecommended, Integer playtime) {
		super();
		this.id = id;
		this.user = user;
		this.game = game;
		this.gameCategory = gameCategory;
		this.rating = rating;
		this.review = review;
		this.isRecommended = isRecommended;
		this.playtime = playtime;
	}

	public UserGameId getId() {
		return id;
	}

	public void setId(UserGameId id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public GameCategory getGameCategory() {
		return gameCategory;
	}

	public void setGameCategory(GameCategory gameCategory) {
		this.gameCategory = gameCategory;
	}

	public GameRating getRating() {
		return rating;
	}

	public void setRating(GameRating rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public Boolean getIsRecommended() {
		return isRecommended;
	}

	public void setIsRecommended(Boolean isRecommended) {
		this.isRecommended = isRecommended;
	}

	public Integer getPlaytime() {
		return playtime;
	}

	public void setPlaytime(Integer playtime) {
		this.playtime = playtime;
	}

	@Override
	public int hashCode() {
		return Objects.hash(game, id, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserGame other = (UserGame) obj;
		return Objects.equals(game, other.game) && Objects.equals(id, other.id) && Objects.equals(user, other.user);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserGame [id=");
		builder.append(id);
//		builder.append(", user=");
//		builder.append(user);
//		builder.append(", game=");
//		builder.append(game);
		builder.append(", gameCategory=");
		builder.append(gameCategory);
		builder.append(", rating=");
		builder.append(rating);
		builder.append(", review=");
		builder.append(review);
		builder.append(", isRecommended=");
		builder.append(isRecommended);
		builder.append(", playtime=");
		builder.append(playtime);
		builder.append("]");
		return builder.toString();
	}

}
