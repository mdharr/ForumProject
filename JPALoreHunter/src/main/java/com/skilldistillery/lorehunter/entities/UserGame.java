package com.skilldistillery.lorehunter.entities;

import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "user_has_game")
public class UserGame {
	
	@EmbeddedId
	private UserGameId id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@MapsId(value = "userId")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "game_id")
	@MapsId(value = "gameId")
	private Game game;
	
	

	public UserGame() {
		super();
	}
	
	public UserGame(UserGameId id, User user, Game game) {
		super();
		this.id = id;
		this.user = user;
		this.game = game;
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
		return "UserGame [id=" + id + ", user=" + user + ", game=" + game + "]";
	}
	
	

}
