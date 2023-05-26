package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.User;
import com.skilldistillery.lorehunter.entities.UserGame;
import com.skilldistillery.lorehunter.entities.UserGameId;
import com.skilldistillery.lorehunter.repositories.GameRepository;
import com.skilldistillery.lorehunter.repositories.UserGameRepository;
import com.skilldistillery.lorehunter.services.GameService;
import com.skilldistillery.lorehunter.services.UserService;

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
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserGameRepository userGameRepo;
	
    // store url for user in game table of database
    @PostMapping("users/{userId}/games/{gameId}/url")
    public ResponseEntity<String> storeGameUrlForUser(
            @PathVariable("userId") int userId,
            @PathVariable("gameId") int gameId,
            @RequestBody String gameUrl) {

        gameService.storeGameUrl(userId, gameId, gameUrl);

        return ResponseEntity.ok("Game URL stored successfully");
    }
    
    @GetMapping("games")
    public ResponseEntity<Object> getGames(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "pageSize", defaultValue = "20") int pageSize) {
        // Fetch data from external API
        String apiUrl = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE
                + "&page=" + page + "&page_size=" + pageSize;
        ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);
        
        // Extract the results array from the API response
        Object responseBody = response.getBody();
        if (responseBody instanceof Map) {
            Map<String, Object> responseMap = (Map<String, Object>) responseBody;
            if (responseMap.containsKey("results")) {
                List<Object> results = (List<Object>) responseMap.get("results");
                int count = (int) responseMap.get("count");

                // Create a custom response object that includes the count field
                Map<String, Object> customResponse = new HashMap<>();
                customResponse.put("results", results);
                customResponse.put("count", count);

                // Return the custom response object to the frontend
                return ResponseEntity.ok().body(customResponse);
            }
        }

        // Return the API response as-is to the frontend
        return response;
    }
    
    @GetMapping("games/search")
    public ResponseEntity<Object> searchGames(@RequestParam("search") String searchQuery) {
      // Fetch data from external API based on search query
      String apiUrl = API_BASE_URL + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE
          + "&search=" + searchQuery;
      ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);

      // Extract the results array from the API response and return it to the frontend
      Object responseBody = response.getBody();
      if (responseBody instanceof Map) {
        Map<String, Object> responseMap = (Map<String, Object>) responseBody;
        if (responseMap.containsKey("results")) {
          List<Object> results = (List<Object>) responseMap.get("results");
          return ResponseEntity.ok().body(results);
        }
      }

      // Return empty response if results not found
      return ResponseEntity.ok().body(Collections.emptyList());
    }
    
    @PostMapping("games")
    public ResponseEntity<Game> addGame(@RequestBody Game game) {
      Game savedGame = gameRepo.save(game);
      return ResponseEntity.ok().body(savedGame);
    }
    
//    @PostMapping("games")
//    public ResponseEntity<Game> createGame(@RequestParam String apiKey, @RequestParam String url, @RequestParam String slug,
//            @RequestParam String name, @RequestParam String description, @RequestParam String released,
//            @RequestParam String backgroundImage) {
//        // Create a new Game object
//        Game game = new Game();
//        game.setApiKey(apiKey);
//        game.setUrl(url);
//        game.setSlug(slug);
//        game.setName(name);
//        game.setDescription(description);
//        game.setReleased(released);
//        game.setBackgroundImage(backgroundImage);
//
//        // Save the game object using your repository or service
//        game = gameService.createGame(game);
//
//        return ResponseEntity.ok().body(game);
//    }
    
    @GetMapping("games/{id}")
    public ResponseEntity<Object> getGameDetails(@PathVariable("id") String gameId) {
        // Construct the URL for retrieving game details
        String apiUrl = API_BASE_URL + "/" + gameId + "?" + API_KEY_PARAM + "=" + API_KEY_VALUE;

        // Send a GET request to the API to retrieve game details
        ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);

        // Return the API response as-is to the frontend
        return response;
    }

}
