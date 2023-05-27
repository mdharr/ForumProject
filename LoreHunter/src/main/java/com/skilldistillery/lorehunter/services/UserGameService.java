package com.skilldistillery.lorehunter.services;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.entities.UserGameId;

public interface UserGameService {
	
	public void addUserGame(User user, Game game);
	
	public void removeUserGame(User user, Game game);
	
    UserGame createUserGame(UserGame userGame);
    UserGame getUserGameById(int userId, int gameId);
    UserGame updateUserGame(int userId, int gameId, UserGame userGame);
    void deleteUserGame(int userId, int gameId);

}
