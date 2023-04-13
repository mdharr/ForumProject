package com.skilldistillery.lorehunter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;

public interface UserGameRepository extends JpaRepository<UserGame, Integer> {
	
	UserGame findByUserAndGame(User user, Game game);

}
