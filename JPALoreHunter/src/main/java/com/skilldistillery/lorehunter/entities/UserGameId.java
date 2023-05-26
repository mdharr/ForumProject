package com.skilldistillery.lorehunter.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Table;

@Embeddable
public class UserGameId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "user_id")
	private int userId;
	
	@Column(name = "game_id")
	private int gameId;

	public UserGameId() {
		super();
	}

	public UserGameId(int userId, int gameId) {
		super();
		this.userId = userId;
		this.gameId = gameId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(gameId, userId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserGameId other = (UserGameId) obj;
		return gameId == other.gameId && userId == other.userId;
	}

	@Override
	public String toString() {
		return "UserGameId [userId=" + userId + ", gameId=" + gameId + "]";
	}

}
