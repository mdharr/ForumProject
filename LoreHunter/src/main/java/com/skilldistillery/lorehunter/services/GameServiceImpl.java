package com.skilldistillery.lorehunter.services;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
	
	private static final String API_BASE_URL = "https://api.rawg.io/api/games";
	private static final String API_BASE_SEARCH_URL = "https://api.rawg.io/api/games?search=";
	private static final String API_KEY_PARAM = "key";
	private static final String API_KEY_VALUE = "a569b5c91c944880a78145c9280ce92c";

	@Override
	public List<Game> getAllGames() {
		String url = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE;
		RestTemplate restTemplate = new RestTemplate();
        Game[] games = restTemplate.getForObject(url, Game[].class); // Perform GET request and map response to Game[] array

        return games != null ? Arrays.asList(games) : Collections.emptyList(); // Convert Game[] array to List<Game> and return
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
	
//	@Override
//	public Game createGameFromApi(Game game) {
//		// Make API call to retrieve game data
//		// Example using RestTemplate
//		RestTemplate restTemplate = new RestTemplate();
//		String apiUrl = "https://api.example.com/games/{gameId}"; // replace with your actual API URL
//		Map<String, String> params = new HashMap<>();
//		params.put("gameId", game.getApiKey()); // assuming apiKey is used as the game ID in the API
//		GameApiResponse gameApiResponse = restTemplate.getForObject(apiUrl, GameApiResponse.class, params);
//
//		// Extract fields from API response
//		String slug = gameApiResponse.getSlug();
//		String name = gameApiResponse.getName();
//		String description = gameApiResponse.getDescription();
//		String released = gameApiResponse.getReleased();
//		String backgroundImage = gameApiResponse.getBackgroundImage();
//
//		// Set fields in Game entity
//		game.setSlug(slug);
//		game.setName(name);
//		game.setDescription(description);
//		game.setReleased(released);
//		game.setBackgroundImage(backgroundImage);
//
//		// Save Game entity to database
//		gameRepository.save(game);
//
//		return game;
//	}
	
    @Override
    public List<Game> getGamesFromExternalApi() {
    	String url = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE;
        // Make an HTTP GET request to the external API and receive the JSON response
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Game[]> response = restTemplate.getForEntity(url, Game[].class);
        Game[] games = response.getBody();

        // Convert the array of games to a List
        List<Game> gameList = Arrays.asList(games);

        return gameList;
    }

}
