package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.skilldistillery.lorehunter.repositories.GameRepository;
import com.skilldistillery.lorehunter.services.GameService;

@CrossOrigin({ "*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class GameController {
	
	private static final String API_BASE_URL = "https://api.rawg.io/api/games";
	private static final String API_BASE_SEARCH_URL = "https://api.rawg.io/api/games?search=";
	private static final String API_KEY_PARAM = "key";
	private static final String API_KEY_VALUE = "a569b5c91c944880a78145c9280ce92c";
	
	@Autowired
	private GameService gameService;
	
	@Autowired
	private GameRepository gameRepo;
	
	@Autowired
	private RestTemplate restTemplate;
	
    // store url for user in game table of database
    @PostMapping("users/{userId}/games/{gameId}/url")
    public ResponseEntity<String> storeGameUrlForUser(
            @PathVariable("userId") int userId,
            @PathVariable("gameId") int gameId,
            @RequestBody String gameUrl) {

        gameService.storeGameUrl(userId, gameId, gameUrl);

        return ResponseEntity.ok("Game URL stored successfully");
    }
    
//    @GetMapping("games")
//    public List<Game> getAllGames() {
//        return gameService.getAllGames();
//    }
    
    @GetMapping("games")
    public ResponseEntity<Object> getGames() {
        // Fetch data from external API
    	String apiUrl = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE;
        ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);

        // Return the API response as-is to the frontend
        return response;
    }

}
