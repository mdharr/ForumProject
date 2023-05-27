package com.skilldistillery.lorehunter.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
	
    @Query("SELECT ug FROM UserGame ug WHERE ug.id.userId = :userId AND ug.id.gameId = :gameId")
    UserGame findByUserIdAndGameId(@Param("userId") int userId, @Param("gameId") int gameId);
    
    @Query("SELECT ug FROM UserGame ug WHERE ug.id.userId = :userId")
    List<UserGame> findByUserId(@Param("userId") int userId);
    
    @Modifying
    @Query("DELETE FROM UserGame ug WHERE ug.id.userId = :userId AND ug.id.gameId = :gameId")
    void deleteByUserIdAndGameId(@Param("userId") int userId, @Param("gameId") int gameId);

}
