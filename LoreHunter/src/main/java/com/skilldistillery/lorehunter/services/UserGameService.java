package com.skilldistillery.lorehunter.services;

import java.security.Principal;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.entities.UserGameId;

public interface UserGameService {
	
	public void addUserGame(User user, Game game);
	
	public void removeUserGame(User user, Game game);
	
    UserGame getUserGameById(int userId, int gameId);
    UserGame updateUserGame(int userId, int gameId, UserGame userGame);
    void deleteUserGame(int userId, int gameId);

	UserGame createUserGame(UserGame userGame, Principal principal);

}
