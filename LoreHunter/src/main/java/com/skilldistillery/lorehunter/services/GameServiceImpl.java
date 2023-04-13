package com.skilldistillery.lorehunter.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.entities.UserGameId;
import com.skilldistillery.lorehunter.repositories.GameRepository;
import com.skilldistillery.lorehunter.repositories.UserGameRepository;
import com.skilldistillery.lorehunter.repositories.UserRepository;

@Service
public class GameServiceImpl implements GameService {
	
	@Autowired
	private GameRepository gameRepo;
	
	@Autowired
	private UserGameRepository userGameRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	private static final String API_BASE_URL = "https://api.rawg.io/api/games/";
	private static final String API_BASE_SEARCH_URL = "https://api.rawg.io/api/games?search=";
	private static final String API_KEY_PARAM = "key";
	private static final String API_KEY_VALUE = "a569b5c91c944880a78145c9280ce92c";

	@Override
	public List<Game> getAllGames() {
		String url = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE;
        // Perform HTTP GET request to fetch games from external API using a HTTP client (e.g., RestTemplate or HttpClient)
        // Parse the response and map it to Game objects
        // Return the list of Game objects
        // Example:
        // List<Game> games = restTemplate.getForObject(url, Game[].class);
        // return games != null ? Arrays.asList(games) : Collections.emptyList();
        // Please note that the exact implementation details may vary depending on the HTTP client and serialization library you choose to use
        return Collections.emptyList(); // Placeholder implementation
	}

	@Override
	public List<Game> getGamesBySearchTerm(String searchTerm) {
		int pageSize = 50;
		String url = API_BASE_SEARCH_URL + "?search=" + searchTerm + "&" + API_KEY_PARAM + "=" + API_KEY_VALUE;
	    
	    
	    return Collections.emptyList(); // Placeholder implementation
	}
	
	@Override
	public void storeGameUrl(int userId, int gameId, String gameUrl) {
	    // Check if the game URL already exists in the database
	    Game existingGame = gameRepo.findByUrl(gameUrl);

	    if (existingGame != null) {
	        // If the game URL already exists, update the game ID to the existing game's ID
	        gameId = existingGame.getId();
	    } else {
	        // If the game URL does not exist, create a new Game entity with the provided game URL
	        Game game = new Game();
	        game.setUrl(gameUrl);

	        // Persist the Game entity to the database to generate an ID
	        game = gameRepo.save(game);

	        // Update the game ID to the generated ID
	        gameId = game.getId();
	    }

	    // Create and persist the UserGame entity with the updated game ID
	    UserGame userGame = new UserGame();
	    userGame.setUser(userRepo.findById(userId).orElse(null));
	    userGame.setGame(gameRepo.findById(gameId).orElse(null));
	    userGameRepo.save(userGame);
	}

}
