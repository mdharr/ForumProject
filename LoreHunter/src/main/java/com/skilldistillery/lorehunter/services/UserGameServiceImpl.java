package com.skilldistillery.lorehunter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.repositories.UserGameRepository;

@Service
public class UserGameServiceImpl implements UserGameService {
	
	@Autowired
	private UserGameRepository userGameRepo;

	@Override
	public void addUserGame(User user, Game game) {
		UserGame userGame = new UserGame();
		userGame.setUser(user);
		userGame.setGame(game);
		userGameRepo.save(userGame);
		
	}

	@Override
	public void removeUserGame(User user, Game game) {
		UserGame userGame = userGameRepo.findByUserAndGame(user, game);
		
		if (userGame != null) {
			userGameRepo.delete(userGame);
		}
		
	}

}
