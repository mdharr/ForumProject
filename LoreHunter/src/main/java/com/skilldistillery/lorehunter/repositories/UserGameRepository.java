package com.skilldistillery.lorehunter.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.entities.UserGameId;

public interface UserGameRepository extends JpaRepository<UserGame, Integer> {
	
	UserGame findByUserAndGame(User user, Game game);
	
	@Query("SELECT u FROM UserGame u WHERE u.id = :userGameId")
    Optional<UserGame> findByUserGameId(@Param("userGameId") UserGameId userGameId);

}
