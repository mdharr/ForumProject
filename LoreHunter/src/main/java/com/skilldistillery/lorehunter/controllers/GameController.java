package com.skilldistillery.lorehunter.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.skilldistillery.lorehunter.entities.Comment;
import com.skilldistillery.lorehunter.entities.Game;
import com.skilldistillery.lorehunter.entities.Ticket;
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
	private static final String API_BASE_SEARCH_BY_ID_URL = "https://api.rawg.io/api/games/";
	private static final String API_KEY_PARAM = "key";
	private static final String API_KEY_VALUE = "a569b5c91c944880a78145c9280ce92c";
	private static final String API_BASE_URL_MOBY = "https://api.mobygames.com/v1/games";
	private static final String API_KEY_VALUE_MOBY = "moby_AoFLZFRks2PS5CM2xbvzfrADzJh";
	
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
//    @PostMapping("users/{userId}/games/{gameId}/url")
//    public ResponseEntity<String> storeGameUrlForUser(
//            @PathVariable("userId") int userId,
//            @PathVariable("gameId") int gameId,
//            @RequestBody String gameUrl) {
//
//        gameService.storeGameUrl(userId, gameId, gameUrl);
//
//        return ResponseEntity.ok("Game URL stored successfully");
//    }
    
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
    
//    @GetMapping("games")
//    public ResponseEntity<Object> getGamesMoby() {
//    	// Fetch data from external API
//    	String apiUrl = API_BASE_URL_MOBY + "?api_key=moby_AoFLZFRks2PS5CM2xbvzfrADzJh";
//    	ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);
//    	
//    	// Extract the results array from the API response
//    	Object responseBody = response.getBody();
//    	if (responseBody instanceof Map) {
//    		Map<String, Object> responseMap = (Map<String, Object>) responseBody;
//    		if (responseMap.containsKey("results")) {
//    			List<Object> results = (List<Object>) responseMap.get("results");
//    			
//    			// Create a custom response object that includes the count field
//    			Map<String, Object> customResponse = new HashMap<>();
//    			customResponse.put("results", results);
//    			
//    			// Return the custom response object to the frontend
//    			return ResponseEntity.ok().body(customResponse);
//    		}
//    	}
//    	
//    	// Return the API response as-is to the frontend
//    	return response;
//    }
    
    @GetMapping("games/search")
    public ResponseEntity<Object> searchGames(@RequestParam("search") String searchQuery) {
      // Fetch data from external API based on search query
      String apiUrl = API_BASE_URL + "?key=" + API_KEY_VALUE
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
    
//    @GetMapping("games/{id}")
//    public ResponseEntity<Object> getGameDetails(@PathVariable("id") String gameId) {
//        String apiUrl = API_BASE_URL + "/" + gameId;
//        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(apiUrl)
//                .queryParam("key", API_KEY_VALUE);
//        
//        ResponseEntity<Object> response = restTemplate.getForEntity(uriBuilder.toUriString(), Object.class);
//        Object responseBody = response.getBody();
//
//        // Print or log the response body to inspect its structure
//        System.out.println(responseBody);
//
//        return ResponseEntity.ok().body(responseBody);
//    }
    
//    @GetMapping("games/{id}")
//    public ResponseEntity<Object> getGameDetails(@PathVariable("id") String gameId) {
//        String apiUrl = "https://api.rawg.io/api/games/" + gameId + "?key=a569b5c91c944880a78145c9280ce92c";
//
//        ResponseEntity<Object> response = restTemplate.getForEntity(apiUrl, Object.class);
//        Object responseBody = response.getBody();
//
//        return ResponseEntity.ok().body(responseBody);
//    }

//    @PostMapping("games")
//    public ResponseEntity<Game> addGame(@RequestBody Game game) {
//    	Game savedGame = gameRepo.save(game);
//    	return ResponseEntity.ok().body(savedGame);
//    }
    
	@GetMapping("games/library")
	public List<Game> listAllGames() {
		return gameService.index();
	}
	
	@PostMapping("games/library")
	public Game addGame(Principal principal, HttpServletRequest req, HttpServletResponse res, @RequestBody Game game) {
		
		try {
			gameService.createGame(principal.getName(), game);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(game.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			game = null;
		}
		
		return game;
	}
	
	@PutMapping("games/library/{id}")
	public ResponseEntity<Game> updateGame(@PathVariable int id, @RequestBody Game game, Principal principal) {
		Optional<Game> optGame = gameRepo.findById(id);
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName();
	    User authenticatedUser = userService.showByUsername(username);
		if (optGame.isPresent()) {
			Game existingGame = optGame.get();
			
			// Example of how to check user information from principal
			if (authenticatedUser == null) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
			
			if (game.getTitle() != null) {
				existingGame.setTitle(game.getTitle());
			}
			
			if (game.getDescription() != null) {
				existingGame.setDescription(game.getDescription());
			}
			
			if (game.getReleased() != null) {
				existingGame.setReleased(game.getReleased());
			}
			
			if (game.getBackgroundImage() != null) {
				existingGame.setBackgroundImage(game.getBackgroundImage());
			}
			
			if (game.getMetacriticScore() != null) {
				existingGame.setMetacriticScore(game.getMetacriticScore());
			}
			
			Game updatedGame = gameService.updateGame(id, existingGame);
			
			if (updatedGame == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			} else {
				return new ResponseEntity<>(updatedGame, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}
