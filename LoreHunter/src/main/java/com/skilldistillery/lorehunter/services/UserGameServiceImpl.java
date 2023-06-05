package com.skilldistillery.lorehunter.services;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.entities.UserGameId;
import com.skilldistillery.lorehunter.repositories.UserGameRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class UserGameServiceImpl implements UserGameService {
	
	@Autowired
	private UserGameRepository userGameRepo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepo;

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

	@Override
	public UserGame createUserGame(UserGame userGame, Principal principal) {
	    String username = principal.getName();
	    User user = userRepo.findByUsername(username);
	    if (user != null) {
	        int userId = user.getId();
	        UserGameId userGameId = new UserGameId();
	        userGameId.setUserId(userId);
	        userGame.setId(userGameId);
	        
	        // Set the user object in the userGame
	        userGame.setUser(user);
	        
	        return userGameRepo.save(userGame);
	    }
	    
	    return null;
	}



    @Override
    public UserGame getUserGameById(int userId, int gameId) {
        return userGameRepo.findByUserIdAndGameId(userId, gameId);
    }

    @Override
    public UserGame updateUserGame(int userId, int gameId, UserGame userGame) {
        UserGame existingUserGame = userGameRepo.findByUserIdAndGameId(userId, gameId);
        if (existingUserGame != null) {
            existingUserGame.setCategory(userGame.getCategory());
            existingUserGame.setRating(userGame.getRating());
            existingUserGame.setReview(userGame.getReview());
            existingUserGame.setIsRecommended(userGame.getIsRecommended());
            existingUserGame.setPlaytime(userGame.getPlaytime());
            return userGameRepo.save(existingUserGame);
        }
        return null;
    }

    @Override
    public void deleteUserGame(int userId, int gameId) {
        userGameRepo.deleteByUserIdAndGameId(userId, gameId);
    }


}
