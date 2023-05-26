package com.skilldistillery.lorehunter.entities;

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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.skilldistillery.lorehunter.enums.GameCategory;
import com.skilldistillery.lorehunter.enums.GameRating;
import com.skilldistillery.lorehunter.enums.TicketPriority;

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

    @ManyToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id")
    @MapsId("gameId")
    private Game game;

    @Enumerated(EnumType.STRING)
    private GameCategory category = GameCategory.PLAYING;

    @Enumerated(EnumType.STRING)
    private GameRating rating = GameRating.ZERO;
	
	public UserGame() {
		super();
	}
	
	public UserGame(UserGameId id, User user, Game game, GameCategory category, GameRating rating) {
		super();
		this.id = id;
		this.user = user;
		this.game = game;
		this.category = category;
		this.rating = rating;
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

	public GameCategory getCategory() {
		return category;
	}

	public void setCategory(GameCategory category) {
		this.category = category;
	}

	public GameRating getRating() {
		return rating;
	}

	public void setRating(GameRating rating) {
		this.rating = rating;
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
		builder.append(", user=");
		builder.append(user);
		builder.append(", game=");
		builder.append(game);
		builder.append(", category=");
		builder.append(category);
		builder.append(", rating=");
		builder.append(rating);
		builder.append("]");
		return builder.toString();
	}

}
