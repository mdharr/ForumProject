package com.skilldistillery.lorehunter.services;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;

public interface UserGameService {
	
	public void addUserGame(User user, Game game);
	
	public void removeUserGame(User user, Game game);

}
