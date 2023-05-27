package com.skilldistillery.lorehunter.services;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.EntityNotFoundException;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.skilldistillery.lorehunter.entities.Category;
import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.Post;
import com.skilldistillery.lorehunter.entities.Ticket;
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
    
    @Override
    public List<Game> index() {
    	return gameRepo.findAll();
    }

    @Override
    public Game createGame(String username, Game game) {
    	User user = userRepo.findByUsername(username);
    	if (user != null) {
    		return gameRepo.saveAndFlush(game);
    	}
        return null;
    }

    @Override
    public Game getGameById(int gameId) {
        return gameRepo.findById(gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
    }

    @Override
    public Game updateGame(int gameId, Game updatedGame) {
        Optional<Game> optionalGame = gameRepo.findById(gameId);
        if (optionalGame.isPresent()) {
            Game existingGame = optionalGame.get();
            existingGame.setTitle(updatedGame.getTitle());
            existingGame.setDescription(updatedGame.getDescription());
            existingGame.setReleased(updatedGame.getReleased());
            existingGame.setBackgroundImage(updatedGame.getBackgroundImage());
            existingGame.setMetacriticScore(updatedGame.getMetacriticScore());
            return gameRepo.save(existingGame);
        }
        throw new IllegalArgumentException("Game not found");
    }

    @Override
    public void deleteGame(int gameId) {
        gameRepo.deleteById(gameId);
    }


}
